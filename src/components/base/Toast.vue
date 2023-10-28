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
  info: 'bg-c-info',
  error: 'bg-c-error',
  warning: 'bg-c-warning',
  success: 'bg-c-success',
}
</script>

<template>
  <div>
    <div :class="`flex w-fit flex-row gap-4 rounded-full ${colorMap[props.type]}`">
      <div class="flex flex-row items-center gap-4 px-8 py-4 text-white">
        <Icon class="shrink-0 fill-white">error</Icon>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
