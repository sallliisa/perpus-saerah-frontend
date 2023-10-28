<script setup lang="ts">
import services from '@/utils/services'
import { ref } from 'vue'
import { Input } from '@/components/inputs/index'
import FileIcons from '@/components/icons/file_icons/index.vue'
import { toast } from '@/stores/toast'
import UploadDropzone from './UploadDropzone.vue'

const props = defineProps({
  modelValue: {
    type: Array<Object>,
    required: false,
  },
  accept: {
    type: String,
    required: false,
  },
  maxSize: {
    type: Number,
    required: false,
    default: 1000000,
  },
  multi: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const uploadPercentage = ref(0)
const uploadDetail = ref()
const loading = ref(false)
const items = ref<Array<Object>>([])
const itemsModalScope = ref<Array<Object>>([])
const preferredDocumentName = ref<string>('')

if (props.modelValue) items.value = props.modelValue

const errorMessage = ref('')

const emit = defineEmits(['update:modelValue', 'update:uploadState'])

const handleFileUpload = (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  if (file.size > props.maxSize * 1000000) {
    toast().setError('Ukuran berkas terlalu besar')
    return
  }
  uploadPercentage.value = 0
  services
    .fileUpload(file, (event: any) => {
      uploadDetail.value = file
      errorMessage.value = ''
      uploadPercentage.value = Math.round((100 * event.loaded) / event.total)
    })
    .then((res) => {
      itemsModalScope.value.push(res.data)
      loading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleFileDelete = (index: number) => {
  items.value.splice(index, 1)
  emit('update:modelValue', items.value)
}

const flushModalBuffer = () => {
  setTimeout(() => {
    ;(itemsModalScope.value = []), (preferredDocumentName.value = '')
  }, 500)
}

const handleCommitFiles = () => {
  items.value.push({ ...itemsModalScope.value[0], name: preferredDocumentName.value })
  flushModalBuffer()
  if (props.multi) {
    emit('update:modelValue', items.value)
  } else {
    emit('update:modelValue', items.value[0])
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Modal v-if="props.multi || items.length == 0">
      <template #trigger>
        <div class="bg-c-primary-light hover:bg-c-primary-light-hover/75 flex max-w-max flex-row items-center justify-center gap-2 rounded-md px-4 py-2">
          <div><Icon class="text-c-primary dark:text-cd-primary">add_circle</Icon></div>
          <div class="text-sm text-c-primary">Tambah dokumen</div>
        </div>
      </template>
      <template #title>
        <div>Unggah Dokumen</div>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div>
            <label class="text-c-black-light flex text-sm">Nama dokumen</label>
            <Input :placeholder="'Isian judul dokumen'" v-model="preferredDocumentName"></Input>
          </div>
          <div class="mb-4" v-if="uploadPercentage != 0 && uploadPercentage != 100">
            <div class="relative flex h-6 items-center rounded-full border border-gray-200">
              <div class="absolute ml-2 text-sm text-blue-200">{{ uploadPercentage }}%</div>
              <div class="h-full rounded-full bg-blue-500" :style="{ width: uploadPercentage + '%' }"></div>
            </div>
          </div>
          <div v-if="itemsModalScope.length != 0" class="flex flex-row flex-wrap items-center gap-4">
            <div v-for="(item, index) in itemsModalScope" class="flex flex-row items-center gap-4 rounded-md border border-c-background px-4 py-2">
              <FileIcons :filetype="(item as any).ext" />
              <div>
                <div class="text-sm">{{ (item as any).filename }}</div>
                <div class="flex flex-row gap-4">
                  <a :href="(item as any).url" class="text-sm text-c-primary">Download</a>
                </div>
              </div>
            </div>
          </div>
          <UploadDropzone v-else-if="uploadPercentage == 0 || uploadPercentage == 100" :accept="props.accept" @update:modelValue="handleFileUpload($event)" />
        </div>
      </template>
      <template #footer="{ closeModal }">
        <div class="flex flex-row gap-4">
          <Button @click=";[flushModalBuffer(), closeModal()]" variant="tonal" class="text-sm">Batal</Button>
          <Button @click=";[closeModal(), handleCommitFiles()]" class="text-sm text-c-primary">Simpan</Button>
        </div>
      </template>
    </Modal>
    <div v-if="items.length != 0" class="flex flex-row flex-wrap items-center gap-4">
      <div v-for="(item, index) in items" class="flex flex-row items-center gap-4 rounded-md border border-c-background px-4 py-2">
        <FileIcons :filetype="(item as any).ext" />
        <div>
          <div class="text-sm">{{ (item as any).name == '' ? (item as any).filename : (item as any).name }}</div>
          <div class="flex flex-row gap-4">
            <a :href="(item as any).url" class="text-sm text-c-primary">Download</a>
            <button class="text-sm text-c-error" @click="handleFileDelete(index)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
