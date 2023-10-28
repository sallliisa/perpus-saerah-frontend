<script setup lang="ts">
import type { PropType } from 'vue';
import { ref, watch } from 'vue';
import BaseInput from './BaseInput.vue';
import {commonProps} from './commonprops'

const props = defineProps({
  constraint: {
    type: Array as PropType<Array<'number' | 'text'>>,
    default: ['text', 'number']
  },
  validator: {
    type: Function as PropType<(value: string) => boolean>,
    default: () => true
  },
  ...commonProps
})

const error = ref('')
const modelValue = defineModel<string | number>()
const inputValue = ref<string | number | undefined>(modelValue.value)
const constraintRegex = {
  number: /^[0-9]*$/,
  text: /^[a-zA-Z\s]*$/,
}

function checkInput(e: InputEvent) {
  if (props.constraint.length !== 1 || e.inputType !== 'insertText') return
  e.data && !constraintRegex[props.constraint[0]].test(e.data) ? e.preventDefault() : null
}

watch(inputValue, (val) => {
  if (props.constraint[0] === 'number' && props.constraint.length === 1) modelValue.value = Number(inputValue.value)
  else modelValue.value = String(inputValue.value)
})

watch(modelValue, (val) => {
  if (!modelValue.value && props.required) error.value = 'Harus diisi!'
  else if (!props.validator(String(modelValue.value))) error.value = props.errorMessage
  else error.value = ''
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <div :class="`rounded-lg flex flex-row items-center gap-4 outline outline-1 outline-c-outline dark:outline-cd-outline focus-within:outline-2 transition-all ease-linear py-3 pl-4 ${error ? 'outline-c-error dark:outline-cd-error' : ''}`">
      <textarea class="bg-transparent focus-visible:outline-none w-full" v-model="inputValue" @beforeinput="(e) => checkInput(e as InputEvent)"/>
      <div v-if="$slots.action" class="mr-4"><slot name="action"></slot></div>
    </div>
  </BaseInput>
</template>