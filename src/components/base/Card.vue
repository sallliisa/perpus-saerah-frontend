<script setup lang="ts">
import type { PropType } from 'vue'
import { twMerge } from 'tailwind-merge'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  interactive: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'primary-container' | 'secondary-container' | 'tertiary-container' | 'warning-container' | 'error-container' | 'info-container' | 'success-container' | 'surface-lowest' | 'surface-low' | 'surface' | 'surface-high' | 'surface-highest'>,
    required: false,
    default: 'surface',
  },
})

const colorMap = {
  primary: 'bg-c-primary dark:bg-cd-primary text-c-on-primary dark:text-cd-on-primary',
  secondary: 'bg-c-secondary dark:bg-cd-secondary text-c-on-secondary dark:text-cd-on-secondary',
  tertiary: 'bg-c-tertiary dark:bg-cd-tertiary text-c-on dark:text-cd-on',
  warning: 'bg-c-warning dark:bg-cd-warning text-c-on-warning dark:text-cd-on-warning',
  error: 'bg-c-error dark:bg-cd-error text-c-on-error dark:text-cd-on-error',
  info: 'bg-c-info dark:bg-cd-info text-c-on-info dark:text-cd-on-info',
  success: 'bg-c-success dark:bg-cd-success text-c-on-success dark:text-cd-on-success',
  "primary-container": "bg-c-primary-container dark:bg-cd-primary-container text-c-on-primary-container dark:text-cd-on-primary-container",
  "secondary-container": 'bg-c-secondary-container dark:bg-cd-secondary-container text-c-on-secondary-container dark:text-cd-on-secondary-container',
  "tertiary-container": 'bg-c-tertiary-container dark:bg-cd-tertiary-container text-c-on-container dark:text-cd-on-container',
  "warning-container": 'bg-c-warning-container dark:bg-cd-warning-container text-c-on-warning-container dark:text-cd-on-warning-container',
  "error-container": 'bg-c-error-container dark:bg-cd-error-container text-c-on-error-container dark:text-cd-on-error-container',
  "info-container": 'bg-c-info-container dark:bg-cd-info-container text-c-on-info-container dark:text-cd-on-info-container',
  "success-container": 'bg-c-success-container dark:bg-cd-success-container text-c-on-success-container dark:text-cd-on-success-container',
  'surface-lowest': 'bg-c-surface-container-lowest dark:bg-cd-surface-container-lowest text-c-on-surface dark:text-cd-on-surface',
  'surface-low': 'bg-c-surface-container-low dark:bg-cd-surface-container-low text-c-on-surface dark:text-cd-on-surface',
  surface: 'bg-c-surface-container dark:bg-cd-surface-container text-c-on-surface dark:text-cd-on-surface',
  'surface-high': 'bg-c-surface-container-high dark:bg-cd-surface-container-high text-c-on-surface dark:text-cd-on-surface',
  'surface-highest': 'bg-c-surface-container-highest dark:bg-cd-surface-container-highest text-c-on-surface dark:text-cd-on-surface',
}
</script>

<template>
  <div :class="`${interactive ? 'overlay cursor-pointer after:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:after:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]' : ''} ${twMerge(`flex flex-col gap-4 rounded-xl px-4 py-4 ${colorMap[props.color]}`, attrs.class as string)}`">
    <div v-if="$slots.header"><slot name="header"></slot></div>
    <slot></slot>
    <div v-if="$slots.footer"><slot name="footer"></slot></div>
  </div>
</template>
