<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import { type PropType, ref } from 'vue'
import {openInMaps} from '@/utils/common'


const props = defineProps({
  location: {
    type: Object as PropType<{ lat: string | number; lng: string | number, address?: string }>,
    required: true,
  },
  lat: {
    type: [String, Number] as PropType<string | number>,
    required: false,
  },
  lng: {
    type: [String, Number] as PropType<string | number>,
    required: false,
  },
})

const location = ref({ lat: 0, lng: 0})
if (props.location) location.value = { lat: Number(props.location.lat), lng: Number(props.location.lng) }
else if (props.lat && props.lng) location.value = { lat: Number(props.lat), lng: Number(props.lng) }
</script>

<template>
  <div class="flex flex-col gap-4">
    <GoogleMap class="h-[250px] w-full max-w-3xl" api-key="AIzaSyArJkzKNSGOGAwtMcsCl6cRlFfAG_dIqmE" :center="location" :zoom="10">
      <Marker @click="() => openInMaps(location.lat, location.lng)" :options="{ position: location }" />
    </GoogleMap>
    <div v-if="props.location?.address" class="italic">{{ props.location.address }}</div>
  </div>
</template>
