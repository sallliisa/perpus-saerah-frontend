<script setup lang="ts">
import {ref, watch} from 'vue'
import BaseInput from './BaseInput.vue';

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
  },
})

const modelValue = defineModel()
const inputValue = ref(modelValue.value)

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

watch(() => modelValue.value, () => {
  inputValue.value = modelValue.value
})
</script>

<template>
  <BaseInput>
    <div @click="handleClick" class="flex flex-row gap-2 items-center cursor-default group/checkbox">
      <Icon class="group-hover/checkbox:brightness-150 cursor-default">{{ inputValue ? 'check_box' : 'check_box_outline_blank' }}</Icon>
      <div v-if="description">{{ description }}</div>
    </div>
  </BaseInput>
</template>