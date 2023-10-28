<script setup lang="ts">
import FileIcons from '@/components/icons/file_icons/index.vue'
import type { PropType } from 'vue'
const props = defineProps({
  filename: {
    type: String,
    required: false
  },
  ext: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  action: {
    type: Object as PropType<{ label: string; action: Function }>,
    required: false,
    default: undefined,
  },
})
</script>

<template>
  <div class="flex max-w-max flex-row items-center gap-4 rounded-md bg-c-surface-container-high p-4 dark:bg-cd-surface-container-high">
    <FileIcons :filetype="(ext as any)" />
    <div>
      <div class="text-sm">{{ filename }}</div>
      <div class="flex flex-row gap-4">
        <a v-if="url" :href="url" target="_parent" class="cursor-pointer text-sm text-c-primary dark:text-cd-info">Download</a>
        <button v-if="props.action" @click.prevent="props.action?.action" class="cursor-pointer text-sm text-c-primary dark:text-cd-info">{{ props.action?.label }}</button>
      </div>
    </div>
  </div>
</template>
