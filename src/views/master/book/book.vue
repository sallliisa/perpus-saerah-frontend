<script setup lang="ts">
import BaseCRUD from '@/components/composites/BaseCRUD.vue'
import type { BaseCRUDConfig } from '@/types'
import BookAdditionalDetails from './layouts/BookAdditionalDetails.vue'
import { softReload } from '@/stores/softreload';

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
      <BaseCRUD :key="softReload().value['book']" main :config="config" :configOverride="props.configOverride">
        <!-- <template #additionalShow="{data}">
          <BookAdditionalDetails :book="data"/>
        </template> -->
      </BaseCRUD>
    </main>
  </div>
</template>

