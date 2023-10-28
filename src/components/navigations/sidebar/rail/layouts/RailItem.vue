<script setup lang="ts">
const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<template>
  <div class="relative w-full">
    <button class="flex w-full flex-col items-center justify-center gap-1 rounded-full bg-transparent text-c-on-surface dark:text-cd-on-surface">
      <div class="overlay rounded-full px-6 py-2 text-c-on-surface after:hover:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:text-cd-on-surface dark:after:hover:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]" :class="props.active ? 'bg-c-secondary-container dark:bg-cd-secondary-container' : ''">
        <slot></slot>
      </div>
      <div v-if="props.title" class="text-xs px-[2px]" :class="active ? 'font-semibold text-c-on-secondary-container dark:text-cd-on-secondary-container' : ''">{{ props.title }}</div>
    </button>
  </div>
</template>
