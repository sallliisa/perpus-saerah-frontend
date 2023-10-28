<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import type { StringObject } from '@/types'
import type { PropType } from 'vue';
import { Radio } from '@/components/inputs';
import { commonProps } from './commonprops';
import {defaultGetData} from '@/app/actions/RadioGroup'
import BaseInput from './BaseInput.vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  items: {
    type: Array as PropType<Array<StringObject>>,
    default: () => []
  },
  view: {
    type: String,
    default: 'name'
  },
  pick: {
    type: String,
    default: 'id'
  },
  getAPI: {
    type: String,
    default: ''
  },
  getData: {
    type: Function as PropType<(getAPI: string, getQueryParameters?: object) => Promise<Array<any>>>,
    default: defaultGetData
  },
  variant: {
    type: String as PropType<'native' | 'card'>,
    default: 'native'
  },
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'row'
  },
  defaultToFirst: {
    type: Boolean,
    default: false
  },
  getQueryParameters: {
    type: Object as PropType<StringObject>,
    default: () => ({})
  },
  ...commonProps
})

const modelValue = defineModel()
const loading = ref(false)
const items = ref(props.items)
const error = ref()

async function preflight() {
  loading.value = true
  if (props.getAPI) items.value = await props.getData(props.getAPI, props.getQueryParameters)
  if (props.defaultToFirst) modelValue.value = items.value[0][props.pick]
  loading.value = false
}

const directionClass = {
  row: 'flex flex-row gap-8',
  column: 'flex flex-col gap-1'
}

preflight()

watch(modelValue, (_) => {
  if (modelValue.value == null && props.required) error.value = 'Harus diisi!'
  else error.value = ''
})
</script>

<template>
  <BaseInput v-if="!loading" v-bind="props" :error="error">
    <div :class="twMerge(directionClass[direction], ($attrs.class as string))">
      <Radio v-for="item in items" @click="modelValue = item[pick]" :description="item[view]" :checked="modelValue === item[pick]">
        <template v-if="$slots.label" #label>
          <slot name="label" v-bind="{data: item}"></slot>
        </template>
      </Radio>
    </div>
  </BaseInput>
</template>
