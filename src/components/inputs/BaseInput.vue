<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  error: {
    type: String,
    required: false,
    default: '',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  helperMessage: {
    type: String,
    required: false,
    default: '',
  },
  disableHelperMessage: {
    type: Boolean,
    required: false,
    default: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div :class="`${twMerge(`flex flex-col gap-2`, $attrs.class as string)}`">
  <label v-if="props.label" class="text-sm">
    {{ props.label }}
    <span v-if="props.required" class="text-c-error dark:text-cd-error">*</span>
  </label>
  <slot></slot>
  <div v-if="!disableHelperMessage" class="min-h-[14px] max-h-[14px]">
    <label v-if="helperMessage && !error" class="text-sm text-muted">{{ helperMessage }}</label>
    <label v-else :class="`text-sm text-c-error dark:text-cd-error`">{{ error }}</label>
  </div>
  </div>
</template>