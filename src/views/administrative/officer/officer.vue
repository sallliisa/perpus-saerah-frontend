<script setup lang="ts">
import BaseCRUD from '@/components/composites/BaseCRUD.vue'
import type { BaseCRUDConfig } from '@/types'

const props = defineProps({
  configOverride: {
    type: Object,
    required: false,
  },
})

const config: Partial<BaseCRUDConfig> = {}
</script>

<template>
  <div>
    <main>
      <BaseCRUD main :config="config" :configOverride="props.configOverride"> </BaseCRUD>
    </main>
  </div>
</template>

