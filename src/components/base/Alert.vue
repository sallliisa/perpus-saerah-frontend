<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'info' | 'error' | 'warning' | 'success'>,
    required: false,
    default: 'info',
  },
  defaultIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const colorMap = {
  info: ['bg-c-info-light dark:bg-cd-info-dark', 'bg-c-info', 'text-c-info dark:text-cd-info', 'fill-c-info dark:fill-cd-info'],
  error: ['bg-c-error-light dark:bg-cd-error-dark', 'bg-c-error', 'text-c-error dark:text-cd-error', 'fill-c-error dark:fill-cd-error'],
  warning: ['bg-c-warning-light dark:bg-cd-warning-dark', 'bg-c-warning', 'text-c-warning dark:text-cd-warning', 'fill-c-warning dark:fill-cd-warning'],
  success: ['bg-c-success-light dark:bg-cd-success-dark', 'bg-c-success', 'text-c-success dark:text-cd-success', 'fill-c-success dark:fill-cd-success'],
}
</script>

<template>
  <div :class="`${colorMap[props.type][0]} flex w-full flex-row gap-4 rounded-xl`">
    <div :class="`${colorMap[props.type][1]} w-2 rounded-l-lg`"></div>
    <div :class="`${colorMap[props.type][2]} flex flex-row items-center gap-4 py-4 pl-2 pr-8`">
      <div v-if="defaultIcon"><Icon>error</Icon></div>
      <slot></slot>
    </div>
  </div>
</template>
