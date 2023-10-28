<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'info' | 'warning' | 'neutral'>,
    required: false,
    default: 'neutral',
  }
})

const colorMap = {
  primary: 'bg-c-primary-container dark:bg-cd-primary-container text-c-on-primary-container dark:text-cd-on-primary-container',
  secondary: 'bg-c-secondary-container dark:bg-cd-secondary-container text-c-on-secondary-container dark:text-cd-on-secondary-container',
  tertiary: 'bg-c-tertiary-container dark:bg-cd-tertiary-container text-c-on-tertiary-container dark:text-cd-on-tertiary-container',
  success: 'bg-c-success-container dark:bg-cd-success-container text-c-on-success-container dark:text-cd-on-success-container',
  error: 'bg-c-error-container dark:bg-cd-error-container text-c-on-error-container dark:text-cd-on-error-container',
  info: 'bg-c-info-container dark:bg-cd-info-container text-c-on-info-container dark:text-cd-on-info-container',
  warning: 'bg-c-warning-container dark:bg-cd-warning-container text-c-on-warning-container dark:text-cd-on-warning-container',
  neutral: 'bg-c-surface-variant dark:bg-cd-surface-variant text-c-on-surface-variant dark:text-cd-on-surface-variant',
}
</script>

<template>
  <div class="relative group/tooltip">
    <div :class="`${colorMap[color]} absolute inline-block min-w-max px-4 py-2 rounded-full -translate-y-[125%] -translate-x-1/2 left-1/2 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity delay-100`">
      <slot name="content"></slot>
    </div>
    <slot name="trigger"></slot>
  </div>
</template>