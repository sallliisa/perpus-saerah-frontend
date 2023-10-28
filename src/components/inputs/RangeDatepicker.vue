<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import { commonProps } from './commonprops';
import { useColorPreference } from '@/stores/colorpreference';
import { ref, type PropType, watch, computed } from 'vue';
import BaseInput from './BaseInput.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'id-ID'
  },
  unit: {
    type: String as PropType<'arbitrary' | 'week'>,
    default: 'arbitrary'
  },
  inline: {
    type: Boolean,
    default: false
  },
  ...commonProps
})

const modelValue = defineModel<Date[]>()
const error = ref('')

function displayFormatter(date: Date[]) {
  return `${date[0]?.toLocaleDateString(props.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${date[1]?.toLocaleDateString(props.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
}

watch(modelValue, () => {
  if ((!modelValue.value || !modelValue.value.length) && props.required) error.value = 'Harus diisi!'
  else error.value = ''
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <Datepicker :range="unit === 'arbitrary'" :weekPicker="unit === 'week'" :inline="inline" v-model="modelValue" :format="displayFormatter" :dark="useColorPreference().isDark()"/>
  </BaseInput>
</template>