<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import { useColorPreference } from '@/stores/colorpreference';
import BaseInput from './BaseInput.vue';
import { commonProps } from './commonprops';
import { ref, watch } from 'vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'id-ID'
  },
  inline: {
    type: Boolean,
    default: false
  },
  ...commonProps
})

const modelValue = defineModel<string>()

const internalValue = ref()

if (modelValue.value) {
  const time = modelValue.value.split(':')
  internalValue.value = {
    hours: time[0],
    minutes: time[1]
  }
}

watch(internalValue, () => {
  modelValue.value = `${internalValue.value.hours}:${internalValue.value.minutes < 10 ? `0${internalValue.value.minutes}` : internalValue.value.minutes}`
})

function displayFormatter(date: Date) {
  return modelValue.value
}
</script>

<template>
  <BaseInput v-bind="props">
    <Datepicker v-model="internalValue" time-picker :inline="inline" :format="displayFormatter" :dark="useColorPreference().isDark()"/>
  </BaseInput>
</template>