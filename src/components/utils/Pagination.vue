<script setup lang="ts">
import { Select } from '@/components/inputs/index'
import {watch, type PropType, computed} from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  dataInfo: {
    type: Object as PropType<{ total: number; totalPage: number, length: number }>,
    required: true,
  },
  disableLengthControl: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const modelValue = defineModel<any>()

const computedModelValue = computed(() => Object.assign({}, modelValue.value))

watch(computedModelValue, (newValue, oldValue) => {
  if (JSON.stringify(newValue) != JSON.stringify(oldValue))
    emit('update:modelValue', newValue)
}, {deep: true})
</script>

<template>
  <div class="flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row">
    <div class="flex flex-row gap-2">
      <Button variant="tonal" :disabled="modelValue.page <= 1" @click="modelValue.page = 1"><Icon :size="16">first_page</Icon></Button>
      <Button variant="tonal" :disabled="modelValue.page <= 1" @click="modelValue.page--"><Icon :size="16">chevron_left</Icon></Button>
      <div class="flex items-center justify-center rounded-full bg-c-surface-variant px-2 text-sm dark:bg-cd-surface-variant">{{ modelValue.page }}</div>
      <Button variant="tonal" :disabled="modelValue.page >= dataInfo.totalPage" @click="modelValue.page++"><Icon :size="16">chevron_right</Icon></Button>
      <Button variant="tonal" :disabled="modelValue.page >= dataInfo.totalPage" @click="modelValue.page = dataInfo.totalPage"><Icon :size="16">last_page</Icon></Button>
    </div>
    <div v-if="!disableLengthControl" class="flex flex-row items-center gap-4 text-sm">
      <Select
        :items="[
          { id: '10', name: '10' },
          { id: '20', name: '20' },
          { id: '50', name: '50' },
          { id: '100', name: '100' },
        ]"
        v-model="modelValue.limit"
        disableHelperMessage
      ></Select>
      <div>Menampilkan {{ dataInfo.length }} dari {{ dataInfo.total }} data</div>
    </div>
  </div>
</template>
