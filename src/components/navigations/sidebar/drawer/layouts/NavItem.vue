<script setup lang="ts">
import { titleCase } from '@/utils/common'

const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
  route: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <button class="overlay flex w-full min-w-full flex-row items-center justify-between gap-4 rounded-full p-4" :class="props.active ? 'bg-c-secondary-container p-4 text-c-on-secondary-container after:hover:bg-c-on-secondary-container/[8%] after:active:bg-c-on-secondary-container/[12%] dark:bg-cd-secondary-container dark:text-cd-on-secondary-container dark:after:hover:bg-cd-on-secondary-container/[8%] dark:after:active:bg-cd-on-secondary-container/[12%]' : 'text-c-on-surface after:hover:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:text-cd-on-surface dark:after:hover:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]'">
    <div class="flex flex-row items-center gap-4">
      <Icon :size="24">{{ props.route.icon }}</Icon>
      <div class="text-left">{{ titleCase(props.route.title) }}</div>
    </div>
    <div v-if="route.routes ? route.routes?.length != 1 : false">
      <Icon :size="24">arrow_forward</Icon>
    </div>
  </button>
</template>
