<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from './Input.vue';
import { commonProps } from './commonprops';
import type { PropType } from 'vue';
import BaseInput from './BaseInput.vue';

const props = defineProps({
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  constraint: {
    type: Array as PropType<Array<'number' | 'text'>>,
    default: ['text', 'number']
  },
  separator: {
    type: String,
    default: ','
  },
  ...commonProps
})

const modelValue = defineModel<string[]>()

const tags = ref<any>(modelValue.value?.length == 0 ? [] : modelValue.value || [])
const inputValue = ref<string>('')

function removeTag(index: number) {
  tags.value.splice(index, 1)
  modelValue.value = tags.value
}

watch(inputValue, () => {
  if (inputValue.value.slice(-1) === props.separator) {
    const value = inputValue.value.slice(0, -1)
    if (inputValue.value !== '' && !tags.value.includes(value)) tags.value.push(value)
    inputValue.value = ''
    modelValue.value = tags.value
  }
})
</script>

<template>
  <BaseInput v-bind="props">
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-2">
        <Chip v-if="tags.length" v-for="(item, index) in tags" @click="removeTag(index)" interactive class="flex flex-row items-center gap-2">{{ item }} <Icon size="14">close</Icon></Chip>
        <div v-else class="text-muted h-[25px] min-h-[25px] max-h-[25px]">Belum ada tag yang dimasukkan</div>
      </div>
      <Input v-bind="{prefix, suffix, icon, constraint}" placeholder="Tekan , untuk memisahkan" v-model="inputValue"/>
    </div>
  </BaseInput>
</template>
