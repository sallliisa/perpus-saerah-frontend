<script setup lang="ts">
import services from '@/utils/services'
import { ref, watch } from 'vue'
import { toast } from '@/stores/toast'
import { ImagePreview } from '@/components/base'
import Draggable from 'vuedraggable'
import Compressor from 'compressorjs'
import BaseInput from './BaseInput.vue'
import { commonProps } from './commonprops'
import type { StringObject } from '@/types'

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
  },
  maxSize: {
    type: Number,
    required: false,
    default: 5,
  },
  disableInformation: {
    type: Boolean,
    required: false,
    default: false,
  },
  allowMulti: {
    type: Boolean,
    required: false,
    default: false,
  },
  limit: {
    type: Number,
    required: false,
    default: -1,
  },
  additionalInfo: {
    type: String,
    required: false,
    default: '',
  },
  ...commonProps
})

const modelValue = defineModel<StringObject | Array<StringObject>>()

const uploadPercentage = ref(0)
const uploadDetail = ref()
const loading = ref(false)
const images = ref<Array<any>>([])
const error = ref('')

if (modelValue.value) {
  if (Array.isArray(modelValue.value)) images.value = modelValue.value
  else images.value = [modelValue.value]
}

const emit = defineEmits(['update:modelValue', 'update:uploadState'])

const emitData = () => {
  if (props.allowMulti) emit('update:modelValue', images.value.map(item => {
    if (item.filename.filename) return item
    else return {filename: item}
  }))
  else emit('update:modelValue', images.value[0])
}

const handleFileUpload = (e: Event) => {
  loading.value = true
  const target = e.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  if (file.size > props.maxSize * 1000000) {
    toast().setError('Ukuran berkas terlalu besar')
    return
  }
  if (!file) return
  uploadPercentage.value = 0
  services
    .fileUpload(file, (event: any) => {
      uploadDetail.value = file
      error.value = ''
      uploadPercentage.value = Math.round((100 * event.loaded) / event.total)
    })
    .then((res) => {
      images.value.push(res.data.data)
      emitData()
      loading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const removeItem = (index: number) => {
  images.value.splice(index, 1)
  emitData()
}

watch(modelValue, () => {
  if (props.allowMulti) {
    if (!(modelValue.value as any[]).length) {
      error.value = 'Harus diisi!'
      return
    }
  } else {
    if (!modelValue.value) {
      error.value = 'Harus diisi!'
      return
    }
  }
  error.value = ''
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <div v-if="!props.disableInformation" class="flex flex-col gap-2">
            <div v-if="props.allowMulti || (!props.allowMulti && !images[0])">
              <div class="font-bold text-c-tertiary dark:text-cd-tertiary">Unggah gambar yang akan digunakan</div>
              <div v-if="props.maxSize != 1000000" class="text-muted text-sm">Ukuran berkas maksimal {{ props.maxSize }} MB</div>
              <div v-if="!(props.limit == 1 || props.limit == -1)" class="text-muted text-sm">Maksimal {{ props.limit }} gambar</div>
              <div v-if="props.additionalInfo" class="mt-2">
                <Chip color="info">{{ props.additionalInfo }}</Chip>
              </div>
            </div>
            <div v-else class="font-semibold text-c-tertiary dark:text-cd-tertiary">{{ images.length }} gambar diunggah</div>
          </div>
          <div class="flex flex-row items-center gap-4">
            <Draggable v-if="images.length" v-model="images" item-key="url" class="flex flex-row items-center gap-4">
              <template #item="{ element, index }">
                <div class="w-fit cursor-move">
                  <ImagePreview v-if="element" :url="element.filename?.preview || element.preview" :thumbnail="element.filename?.preview || element.preview">
                    <template #actions>
                      <Button small square color="error" @click="removeItem(index)"><Icon>delete_forever</Icon></Button>
                    </template>
                  </ImagePreview>
                </div>
              </template>
            </Draggable>
            <label v-if="(props.allowMulti && images.length != (props.limit == -1 ? 99999 : props.limit)) || (!props.allowMulti && !images[0])">
              <a class="h-4 w-full cursor-pointer">
                <div class="relative flex h-40 w-40 items-center justify-center rounded-xl outline-dashed outline-2 outline-c-outline dark:outline-cd-outline">
                  <Icon :size="36" class="text-c-surface-variant dark:text-cd-surface-variant">add_photo_alternate</Icon>
                  <div class="absolute left-0 top-0 h-full w-full">
                    <div v-if="uploadPercentage != 0 && uploadPercentage != 100" class="absolute h-40 w-40 rounded-xl bg-c-tertiary/20 dark:bg-cd-tertiary/20" :style="{ width: uploadPercentage + '%' }"></div>
                  </div>
                </div>
                <input type="file" hidden id="file" :accept="'image/*'" class="rounded-md p-2" @change="handleFileUpload($event)" />
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  </BaseInput>
</template>
