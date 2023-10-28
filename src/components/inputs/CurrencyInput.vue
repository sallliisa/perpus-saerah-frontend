<script setup lang="ts">
import { ref, watch } from 'vue';
import Input from './Input.vue';
import { computed } from '@vue/reactivity';
import BaseInput from './BaseInput.vue';
import { commonProps } from './commonprops';

const props = defineProps({
  currency: {
    type: String,
    required: false,
    default: 'IDR',
  },
  locale: {
    type: String,
    required: false,
    default: 'ID',
  },
  ...commonProps
})

const modelValue = defineModel<number>()

function deformat(value: string) {
  if (value[0] === '0') value = value.slice(1)
  return value.replace(/[^0-9]/g, '')
}

function emitChange(event: any) {
  modelValue.value = Number(deformat(event.target.value))
}

const currencyValue = computed(() => {
  return new Intl.NumberFormat(props.locale).format(modelValue.value || 0)
})
</script>

<template>
  <Input v-bind="props" :prefix="Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency }).formatToParts(0).find((x) => x.type == 'currency')?.value" :constraint="['integer']" :modelValue="currencyValue" class="w-full bg-transparent focus:outline-none" @input="(event) => emitChange(event)" />
</template>
