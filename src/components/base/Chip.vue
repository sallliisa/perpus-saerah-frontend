<script setup lang="ts">
import type { PropType } from 'vue'
const props = defineProps({
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'neutral' | null>,
    required: false,
    default: 'primary',
  },
  variant: {
    type: String as PropType<'fill' | 'tonal' | 'outline'>,
    required: false,
    default: 'fill',
  },
  interactive: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const baseClass = `flex h-fit w-fit items-center justify-center rounded-full px-2 py-1 text-center text-sm font-semibold ${props.interactive ? 'overlay cursor-pointer after:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:after:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]' : ''}`

const colorMap = {
  primary: {
    fill: 'bg-c-primary dark:bg-cd-primary text-c-on-primary dark:text-cd-on-primary',
    tonal: 'bg-c-primary-container text-c-on-primary-container dark:bg-cd-primary-container dark:text-cd-on-primary-container',
    outline: 'outline outline-1 outline-c-primary dark:outline-cd-primary',
  },
  secondary: {
    fill: 'bg-c-secondary dark:bg-cd-secondary text-c-on-secondary dark:text-cd-on-secondary',
    tonal: 'bg-c-secondary-container text-c-on-secondary-container dark:bg-cd-secondary-container dark:text-cd-on-secondary-container',
    outline: 'outline outline-1 outline-c-secondary dark:outline-cd-secondary',
  },
  tertiary: {
    fill: 'bg-c-tertiary dark:bg-cd-tertiary text-c-on-tertiary dark:text-cd-on-tertiary',
    tonal: 'bg-c-tertiary-container text-c-on-tertiary-container dark:bg-cd-tertiary-container dark:text-cd-on-tertiary-container',
    outline: 'outline outline-1 outline-c-tertiary dark:outline-cd-tertiary',
  },
  success: {
    fill: 'bg-c-success dark:bg-cd-success text-c-on-success dark:text-cd-on-success',
    tonal: 'bg-c-success-container text-c-on-success-container dark:bg-cd-success-container dark:text-cd-on-success-container',
    outline: 'outline outline-1 outline-c-success dark:outline-cd-success',
  },
  error: {
    fill: 'bg-c-error dark:bg-cd-error text-c-on-error dark:text-cd-on-error',
    tonal: 'bg-c-error-container text-c-on-error-container dark:bg-cd-error-container dark:text-cd-on-error-container',
    outline: 'outline outline-1 outline-c-error dark:outline-cd-error',
  },
  warning: {
    fill: 'bg-c-warning dark:bg-cd-warning text-c-on-warning dark:text-cd-on-warning',
    tonal: 'bg-c-warning-container text-c-on-warning-container dark:bg-cd-warning-container dark:text-cd-on-warning-container',
    outline: 'outline outline-1 outline-c-warning dark:outline-cd-warning',
  },
  info: {
    fill: 'bg-c-info dark:bg-cd-info text-c-on-info dark:text-cd-on-info',
    tonal: 'bg-c-info-container text-c-on-info-container dark:bg-cd-info-container dark:text-cd-on-info-container',
    outline: 'outline outline-1 outline-c-info dark:outline-cd-info',
  },
  neutral: {
    fill: 'bg-c-surface-variant dark:bg-cd-surface-variant text-c-on-surface-variant dark:text-cd-on-surface-variant',
    tonal: 'bg-c-surface-container-highest dark:bg-cd-surface-container-highest text-c-on-surface dark:text-cd-on-surface',
    outline: 'outline outline-1 outline-c-surface-variant dark:outline-cd-surface-variant',
  },
}
</script>

<template>
  <div v-if="props.color" :class="`${baseClass} ${colorMap[props.color][props.variant]}`">
    <slot></slot>
  </div>
  <div v-else class="box-border flex h-fit w-fit items-center justify-center rounded-full bg-c-surface-container-highest px-2 py-1 text-center text-sm text-c-on-surface dark:bg-cd-surface-container-highest dark:text-cd-on-surface">
    <slot></slot>
  </div>
</template>
