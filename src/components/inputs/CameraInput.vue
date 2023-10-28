<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Spinner, Button, Modal } from '@/components/base/index'
import { toast } from '@/stores/toast'
import services from '@/utils/services'

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const isCameraOpen = ref(false)
const isPhotoTaken = ref(false)
const isShotPhoto = ref(false)
const loading = ref(false)
const camera = ref()
const canvas = ref()
const canvasProperties = ref({
  width: 450,
  height: 338,
})
const image = ref((props.modelValue as any)?.url)
const imagePreview = ref()

const createCameraElement = () => {
  loading.value = true
  Object.assign(window, { constraints: { video: true, audio: false } })
  navigator.mediaDevices.getUserMedia((window as any).constraints).then((stream) => {
    camera.value.srcObject = stream
    canvasProperties.value = {
      width: stream.getVideoTracks()[0].getSettings().width || 450,
      height: stream.getVideoTracks()[0].getSettings().height || 338,
    }
    loading.value = false
  })
}

const stopCameraStream = () => {
  let tracks = camera.value.srcObject.getTracks()
  if (tracks) {
    tracks.forEach((track: any) => {
      track.stop()
    })
  }
}

const activateCamera = () => {
  isCameraOpen.value = true
  createCameraElement()
}

const deactivateCamera = () => {
  isCameraOpen.value = false
  isPhotoTaken.value = false
  isShotPhoto.value = false
  stopCameraStream()
}

const takePhoto = () => {
  if (!isPhotoTaken.value) {
    isShotPhoto.value = true
    const FLASH_TIMEOUT = 50
    setTimeout(() => {
      isShotPhoto.value = false
    }, FLASH_TIMEOUT)
  }
  isPhotoTaken.value = !isPhotoTaken.value
  const context = canvas.value.getContext('2d')
  context.drawImage(camera.value, 0, 0, canvasProperties.value.width, canvasProperties.value.height)
}

const resetCameraState = () => {
  isCameraOpen.value = false
  isPhotoTaken.value = false
  isShotPhoto.value = false
}

const resetComponentState = () => {
  resetCameraState()
  image.value = undefined
}

const uploadPercentage = ref(0)
const uploadDetail = ref()

const handleFileUpload = (file: Blob) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  uploadPercentage.value = 0
  services
    .fileUpload(file, (event: any) => {
      uploadDetail.value = file
      uploadPercentage.value = Math.round((100 * event.loaded) / event.total)
    })
    .then((res) => {
      emit('update:modelValue', res.data)
      loading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  return blob
}

const commitPhoto = () => {
  image.value = canvas.value.toDataURL('image/png')
  if (image.value) handleFileUpload(dataURItoBlob(image.value))
  else toast().setError('Gagal menyimpan foto')
}

onMounted(() => {
  if (isCameraOpen.value == true) deactivateCamera()
})
</script>

<template>
  <div class="flex flex-row gap-4">
    <img v-if="image" :src="image" class="h-36 w-36 rounded-xl bg-c-surface-container-highest object-scale-down dark:bg-cd-surface-container-highest" />
    <div class="flex flex-col items-center justify-center gap-2">
      <Modal :title="'Kamera'" :closeAction="() => deactivateCamera()">
        <template #trigger>
          <Button v-if="!image" @click="activateCamera()">Buka Kamera <Icon>photo_camera</Icon></Button>
          <Button v-else @click="activateCamera()">Ambil Ulang Foto <Icon class="h-5 w-5">refresh</Icon></Button>
        </template>
        <template #content="{ closeModal }">
          <div class="flex h-full w-full flex-col items-center gap-4">
            <div v-if="loading" class="flex items-center justify-center" :style="{ width: canvasProperties.width, height: canvasProperties.height }">
              <Spinner />
            </div>
            <video v-show="!isPhotoTaken" ref="camera" class="max-w-full" :width="canvasProperties.width" :height="canvasProperties.height" autoplay></video>
            <canvas v-show="isPhotoTaken" ref="canvas" class="max-w-full" :width="canvasProperties.width" :height="canvasProperties.height"></canvas>
            <div class="flex w-full flex-row justify-center gap-2">
              <Button v-if="!isPhotoTaken" @click="takePhoto()" variant="tonal" class="aspect-square h-12 w-12"><Icon>photo_camera</Icon></Button>
              <Button v-else @click="resetCameraState()" variant="tonal" class="aspect-square h-12 w-12"><Icon class="h-5 w-5">refresh</Icon></Button>
              <Button v-if="isPhotoTaken" @click=";[commitPhoto(), closeModal()]" class="aspect-square h-12 w-12" variant="tonal" color="success"><Icon>check_circle</Icon></Button>
            </div>
          </div>
        </template>
      </Modal>
      <Button v-if="image" @click="resetComponentState()" class="w-full" variant="tonal">Hapus Foto <Icon>delete</Icon></Button>
    </div>
  </div>
</template>
