<script setup lang="ts">
import { debounce } from '@/utils/common';
import { ref, watch } from 'vue';

const props = defineProps({
  debounced: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Cari...'
  }
})

const modelValue = defineModel<string>()

const value = ref(modelValue.value)
const debouncedSetValue = debounce(() => modelValue.value = value.value, 300)

watch(value, () => {
  if (!props.debounced) modelValue.value = value.value
  else debouncedSetValue()
})

watch(modelValue, () => value.value = modelValue.value)
</script>

<template>
  <div class="rounded-full flex flex-row gap-4 transition-all ease-linear py-3 pl-4 bg-c-surface-container-high dark:bg-cd-surface-container-high">
    <Icon>search</Icon>
    <input class="bg-transparent focus-visible:outline-none w-full" :placeholder="placeholder" v-model="value">
  </div>
</template>