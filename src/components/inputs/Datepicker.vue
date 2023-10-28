<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import { useColorPreference } from '@/stores/colorpreference';
import BaseInput from './BaseInput.vue';
import { commonProps } from './commonprops';
import { watch } from 'vue';

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

const modelValue = defineModel<Date>()

function displayFormatter(date: Date) {
  return date.toLocaleDateString(props.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <BaseInput v-bind="props">
    <Datepicker v-model="modelValue" :inline="inline" :format="displayFormatter" :dark="useColorPreference().isDark()"/>
  </BaseInput>
</template>