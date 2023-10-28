<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
  onToggle: {
    type: Function,
    required: false,
    default: () => {}
  },
  onActive: {
    type: Function,
    required: false,
    default: () => {}
  },
  onDeactive: {
    type: Function,
    required: false,
    default: () => {}
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
})

const modelValue = defineModel()
const inputValue = ref(modelValue.value || false)

const classMap = {
  track: {
    false: 'bg-c-surface-container-highest dark:bg-cd-surface-container-highest outline outline-2 outline-c-outline dark:outline-cd-outline',
    true: 'bg-c-primary dark:bg-cd-primary'
  },
  thumb: {
    false: 'bg-c-outline dark:bg-cd-outline',
    true: 'bg-c-on-primary dark:bg-cd-on-primary translate-x-[22px]'
  }
}

function handleClick() {
  inputValue.value = !inputValue.value
  props.onToggle(inputValue.value)
  if (inputValue.value) {
    props.onActive()
  } else {
    props.onDeactive()
  }
  modelValue.value = inputValue.value
}
</script>

<template>
  <div class="flex flex-row items-center gap-4">
    <button type="button" @click="handleClick" :class="`p-2 rounded-full min-w-[52px] max-w-[52px] ${(classMap.track as any)[String(inputValue)]}`">
      <div class="w-full h-full flex">
        <div :class="`min-w-[16px] min-h-[16px] rounded-full transition-all ${(classMap.thumb as any)[String(inputValue)]}`"></div>
      </div>
    </button>
    <div v-if="description">{{ description }}</div>
  </div>
</template>