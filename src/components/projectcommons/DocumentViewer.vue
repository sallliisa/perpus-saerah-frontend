<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
})

const filename = computed(() => {
  const url = props.url
  const lastSlash = url.lastIndexOf('/')
  return url.substring(lastSlash + 1)
})

const allowedFileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'png', 'jpg', 'jpeg']
</script>

<template>
  <div v-if="!props.url" class="flex h-full w-full flex-col items-center justify-center">
    <Icon :size="144" class="text-c-black-light dark:text-cd-background-light-hover">visibility</Icon>
    <div class="text-c-black-light dark:text-cd-background-light-hover">Pilih salah satu dokumen untuk ditampilkan</div>
  </div>
  <div v-else-if="!allowedFileTypes.includes(props.ext.toLowerCase())" class="flex h-full w-full flex-col items-center justify-center">
    <Icon :size="144" class="text-c-black-light dark:text-cd-background-light-hover">visibility_off</Icon>
    <div class="text-c-black-light dark:text-cd-background-light-hover">Format dokumen tidak didukung</div>
  </div>
  <div v-else-if="['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(props.ext.toLowerCase())" class="flex h-full w-full flex-col items-center justify-center">
    <iframe :key="props.url" :src="ext != 'pdf' ? 'https://view.officeapps.live.com/op/embed.aspx?src=' + props.url : props.url" class="h-full min-h-[full] w-full"></iframe>
  </div>
  <div v-else>
    <img :src="props.url" class="h-full w-full object-cover" />
  </div>
</template>
