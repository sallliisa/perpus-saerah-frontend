<script setup lang="ts">
const props = defineProps({
  secondary: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <button :class="secondary ? 'bg-c-surface-variant fill-c-primary hover:bg-c-on-surface-variant/[8%] dark:bg-cd-surface-variant dark:fill-cd-primary dark:hover:bg-cd-on-surface-variant/[8%]' : 'hover:bg-c-primary-hover bg-c-primary fill-white'" class="flex h-9 w-9 items-center justify-center rounded-full p-4"><slot></slot></button>
</template>
