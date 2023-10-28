<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  accept: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:uploadState'])

const dropZoneRef = ref<HTMLDivElement>()
const handleFileDrop = (file: File) => {
  emit('update:modelValue', file)
}

function onDrop(files: File[] | null) {
  if (files) {
    handleFileDrop(files[0])
  }
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const fileInput = ref()

const openFileDialog = () => {
  if (fileInput.value) {
    ;(fileInput.value as HTMLInputElement).click()
  }
}
</script>

<template>
  <div ref="dropZoneRef">
    <div class="flex min-h-[12rem] w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-c-outline py-8 dark:border-cd-outline">
      <div v-if="!isOverDropZone" class="flex flex-col items-center gap-4">
        <div class="text-c-black-light font-bold">Letakkan file anda di sini</div>
        <div class="text-c-black-light">Atau</div>
        <label class="w-fit">
          <a class="cursor-pointer">
            <Button @click="openFileDialog()" variant="tonal">
              <Icon>add_circle</Icon>
              <div>Pilih dari penyimpanan</div>
            </Button>
            <input ref="fileInput" type="file" hidden id="file" :accept="props.accept || undefined" class="rounded-md p-2" @change="handleFileDrop((($event.target as HTMLInputElement).files as FileList)[0])" />
          </a>
        </label>
      </div>
      <div v-else>
        <div class="flex flex-col items-center justify-center gap-4">
          <div><Icon :size="64">cloud_upload</Icon></div>
          <div class="text-c-black-light font-bold">Lepaskan kursor untuk mengunggah</div>
        </div>
      </div>
    </div>
  </div>
</template>
