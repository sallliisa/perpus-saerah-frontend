<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { ref, watch, type PropType } from 'vue'
import services from '@/utils/services'
import type { StringObject } from '@/types'
import { commonProps } from './commonprops'
import { Popover } from '../base'
import SearchBox from '../composites/SearchBox.vue'
import BaseInput from './BaseInput.vue'
import Form from '../composites/Form.vue'

type Coordinate = {
  lat: number,
  lng: number,
  formatted_address?: string
}

const props = defineProps({
  ...commonProps,
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  formConfig: {
    type: Object as PropType<any>,
  }
})

const modelValue = defineModel<Coordinate>()
if (props.lat && props.lng) modelValue.value = { lat: Number(props.lat), lng: Number(props.lng) }
else if (!modelValue.value?.lat || !modelValue.value?.lng) modelValue.value = { lat: -6.1753924, lng: 106.8271528 }

const selectedLocation = ref()
const query = ref('')
const zoom = ref(10)
const center = ref<Coordinate>(modelValue.value)
const autocompletePredictions = ref<StringObject<any>[]>([])
const error = ref('')

watch(modelValue, () => {
  if (modelValue.value) center.value = modelValue.value
  if (props.required) error.value = !modelValue.value ? 'Harus diisi!' : ''
})

async function getLocationDetail(place_id: any) {
  zoom.value = 15
  const {result} = await services.get('google-map/detailPlace', {place_id, fields: ['geometry', 'formatted_address']})
  modelValue.value = {
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    formatted_address: result.formatted_address
  }
}

async function getPlacesAutocomplete() {
  const {predictions} = await services.get('google-map/placeAutocomplete', {input: query.value})
  autocompletePredictions.value = predictions
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    modelValue.value = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
  })
}

watch(query, () => {
  if (query.value) getPlacesAutocomplete()
})

function handlePinDragEnd(event: any) {
  modelValue.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }
}
</script>

<template>
<BaseInput v-bind="props">
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-3 flex flex-col gap-4">
      <Popover class="w-full">
        <template #trigger>
          <SearchBox v-model="query" :placeholder="'Cari lokasi...'"/>
        </template>
        <template #content>
          <Card class="min-w-full gap-2">
            <template v-if="query">
              <template v-if="autocompletePredictions">
                <Card v-for="prediction in autocompletePredictions" interactive :color="prediction.place_id === selectedLocation?.place_id ? 'secondary' : 'surface'" @click="[getLocationDetail(prediction.place_id), (selectedLocation = prediction)]" class="flex-row items-center">
                  <div class="min-w-max">{{ prediction.structured_formatting.main_text }}</div>
                  <div class="text-muted text-sm whitespace-nowrap truncate">{{ prediction.structured_formatting.secondary_text }}</div>
                </Card>
              </template>
            </template>
            <div v-else>Masukkan kata kunci untuk mencari lokasi</div>
          </Card>
        </template>
      </Popover>
      <Card class="flex-row gap-4 items-center">
        <Tooltip>
          <div>Gunakan lokasi saat ini</div>
          <template #trigger>
            <Button variant="icon" square @click="getCurrentLocation"><Icon class="max-h-fit max-w-fit">my_location</Icon></Button>
          </template>
        </Tooltip>
        <div class="flex flex-col gap-2">
          <div>{{ modelValue?.lat }}, {{ modelValue?.lng }}</div>
          <div v-if="modelValue?.formatted_address">{{ modelValue.formatted_address }}</div>
        </div>
      </Card>
      <Form v-if="formConfig && modelValue" static v-model="modelValue" v-bind="formConfig"></Form>
    </div>
    <div class="w-full rounded-full col-span-9">
      <GoogleMap class="h-[450px] w-full" :apiKey="'AIzaSyArJkzKNSGOGAwtMcsCl6cRlFfAG_dIqmE'" :center="center" :zoom="zoom">
        <Marker :options="{position: modelValue, draggable: true}" @dragend="handlePinDragEnd($event)" />
      </GoogleMap>
    </div>
  </div>
</BaseInput>
</template>