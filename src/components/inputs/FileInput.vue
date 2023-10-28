<script setup lang="ts">
import services from '@/utils/services'
import { ref, watch } from 'vue'
import { FileComponent } from '@/components/base/index'
import { toast } from '@/stores/toast'
import UploadDropzone from './UploadDropzone.vue'
import BaseInput from './BaseInput.vue'
import { commonProps } from './commonprops'

const props = defineProps({
  accept: {
    type: Array<string>,
    required: false,
    default: undefined,
  },
  maxSize: {
    type: Number,
    required: false,
    default: 5,
  },
  allowMulti: {
    type: Boolean,
    required: false,
    default: false,
  },
  ...commonProps
})

const uploadPercentage = ref(0)
const uploadDetail = ref()
const loading = ref(false)
const error = ref<string>()
const items = ref<Array<string>>([])
  
const modelValue = defineModel<any>()
if (modelValue.value) {
  if (Array.isArray(modelValue.value)) items.value = modelValue.value
  else items.value.push(modelValue.value)
}

if (modelValue.value) {
  if (props.allowMulti) {
    items.value = (modelValue.value as any[]).map(item => item.filename)
  }
}

function emitChanges() {
  console.log('items after', items.value)
  if (props.allowMulti) modelValue.value = items.value.map(item => {return {filename: item}})
  else modelValue.value = items.value[0] || null
}

const handleFileUpload = (file: File) => {
  console.log('items before', items.value)
  const reader = new FileReader()
  reader.readAsDataURL(file)
  if (props.accept) {
    if (!props.accept.find((type) => type === file.type)) {
      toast().setError('Tipe berkas tidak didukung')
      return
    }
  }
  if (file.size > props.maxSize * 1000000) {
    toast().setError('Ukuran berkas terlalu besar')
    return
  }
  uploadPercentage.value = 0
  services
    .fileUpload(file, (event: any) => {
      uploadDetail.value = file
      uploadPercentage.value = Math.round((100 * event.loaded) / event.total)
    })
    .then((res) => {
      items.value.push(res.data.data.file)
      loading.value = false
      uploadPercentage.value = 0
      emitChanges()
    })
    .catch((err) => {
      toast().setError('Gagal mengunggah berkas')
    })
}

const handleFileDelete = (index: number) => {
  items.value.splice(index, 1)
  emitChanges()
  if (!props.allowMulti) items.value = []
}

watch(modelValue, () => {
  if (modelValue.value == null && props.required) error.value = 'Harus diisi!'
  else error.value = ''
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <div class="mb-4" v-if="uploadPercentage != 0 && uploadPercentage != 100">
      <div class="relative flex h-6 items-center rounded-full border border-gray-200">
        <div class="absolute ml-2 text-sm text-blue-200">{{ uploadPercentage }}%</div>
        <div class="h-full rounded-full bg-blue-500" :style="{ width: uploadPercentage + '%' }"></div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div v-if="items.length > 0" class="flex flex-row flex-wrap items-center gap-4">
        <template v-for="(item, index) in items" :key="index">
          <FileComponent
            :filename="item"
            :ext="item.split('.')[1]"
            :action="{
              label: 'Hapus',
              action: () => handleFileDelete(index),
            }"
          />
        </template>
      </div>
      <div v-if="props.allowMulti || items.length == 0">
        <UploadDropzone @update:modelValue="handleFileUpload($event)" />
      </div>
    </div>
  </BaseInput>
</template>
