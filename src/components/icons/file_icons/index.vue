<script setup lang="ts">
import { type PropType, defineAsyncComponent } from 'vue'

const props = defineProps({
  filetype: {
    type: String as PropType<allowedFileTypes>,
    required: true,
  },
})

const icons = {
  ai: defineAsyncComponent(() => import('./ai.vue')),
  avi: defineAsyncComponent(() => import('./avi.vue')),
  ccs: defineAsyncComponent(() => import('./ccs.vue')),
  csv: defineAsyncComponent(() => import('./csv.vue')),
  doc: defineAsyncComponent(() => import('./doc.vue')),
  docx: defineAsyncComponent(() => import('./docx.vue')),
  eps: defineAsyncComponent(() => import('./eps.vue')),
  epub: defineAsyncComponent(() => import('./epub.vue')),
  fb2: defineAsyncComponent(() => import('./fb2.vue')),
  html: defineAsyncComponent(() => import('./html.vue')),
  jpg: defineAsyncComponent(() => import('./jpg.vue')),
  mp3: defineAsyncComponent(() => import('./mp3.vue')),
  pdf: defineAsyncComponent(() => import('./pdf.vue')),
  png: defineAsyncComponent(() => import('./png.vue')),
  ppt: defineAsyncComponent(() => import('./ppt.vue')),
  pptx: defineAsyncComponent(() => import('./pptx.vue')),
  psd: defineAsyncComponent(() => import('./psd.vue')),
  txt: defineAsyncComponent(() => import('./txt.vue')),
  wav: defineAsyncComponent(() => import('./wav.vue')),
  xls: defineAsyncComponent(() => import('./xls.vue')),
  xlsx: defineAsyncComponent(() => import('./xlsx.vue')),
  zip: defineAsyncComponent(() => import('./zip.vue')),
  defaultIcon: defineAsyncComponent(() => import('./default.vue')),
}

type allowedFileTypes = keyof typeof icons
</script>

<template>
  <component :is="icons[props.filetype] || icons.defaultIcon" class="h-12 min-w-[48px] max-w-[48px]" />
</template>
