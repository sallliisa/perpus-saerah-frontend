<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  fetcher: {
    type: Function,
    required: true,
  },
})

const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await props.fetcher()
  loading.value = false
})
</script>

<template>
  <slot v-if="loading" name="loadingComponent"></slot>
  <slot v-else></slot>
</template>
