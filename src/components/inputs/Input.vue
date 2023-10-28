<script setup lang="ts">
import type { PropType } from 'vue';
import { computed, ref, watch } from 'vue';
import BaseInput from './BaseInput.vue';
import {commonProps} from './commonprops'
import { twMerge } from 'tailwind-merge';

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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  constraint: {
    type: Array as PropType<Array<'number' | 'integer' | 'decimal' | 'text'>>,
    default: () => ['decimal', 'text']
  },
  validator: {
    type: Function as PropType<(value: string) => boolean>,
    default: () => true
  },
  ...commonProps
})

const error = ref('')
const modelValue = defineModel<string | number>()
const inputValue = ref(modelValue.value)
const constraintRegex = {
  number: /^[0-9\.]*$/,
  integer: /^[0-9]*$/,
  decimal: /^[0-9\.]*$/,
  text: /^[a-zA-Z\s]*$/,
}

function checkInput(e: InputEvent) {
  if (props.constraint.length !== 1 || e.inputType !== 'insertText') return
  e.data && !constraintRegex[props.constraint[0]].test(e.data) ? e.preventDefault() : null
}

watch(inputValue, (val) => {
  if (['number', 'integer', 'decimal'].includes(props.constraint[0]) && props.constraint.length === 1) modelValue.value = Number(inputValue.value)
  else modelValue.value = String(inputValue.value)
})

watch(modelValue, (val) => {
  if (!modelValue.value && props.required) error.value = 'Harus diisi!'
  else if (!props.validator(String(modelValue.value))) error.value = props.errorMessage
  else error.value = ''
  inputValue.value = modelValue.value
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <div :class="twMerge(`rounded-lg flex flex-row items-center gap-4 outline outline-1 outline-c-outline dark:outline-cd-outline focus-within:outline-2 transition-all ease-linear py-3 pl-4 ${error ? 'outline-c-error dark:outline-cd-error' : ''} ${disabled ? 'cursor-not-allowed pointer-events-none !bg-c-surface-variant/50 dark:bg-cd-surface-variant/50' : ''}`, ($attrs.class as string))">
      <Icon v-if="props.icon">{{ props.icon }}</Icon>
      <p v-if="props.prefix">{{ prefix }}</p>
      <input :type="props.type" :placeholder="placeholder" class="bg-transparent focus-visible:outline-none w-full" v-model="inputValue" @beforeinput="(e) => checkInput(e as InputEvent)"/>
      <p v-if="props.suffix" class="mr-4 min-w-max">{{ suffix }}</p>
      <div v-if="$slots.action" class="mr-4 max-h-min"><slot name="action"></slot></div>
    </div>
  </BaseInput>
</template>