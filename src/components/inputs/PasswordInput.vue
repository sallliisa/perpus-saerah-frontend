<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';
import Input from './Input.vue';

const props = defineProps({
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  constraint: {
    type: Array as PropType<Array<'number' | 'text'>>,
    default: () => ['text', 'number']
  },
  validator: {
    type: Function as PropType<(value: string) => boolean>,
    default: () => true
  }
})

const modelValue = defineModel<string>()
const showPassword = ref<boolean>(false)
</script>

<template>
  <Input v-bind="props" v-model="modelValue" :type="showPassword ? 'text' : 'password'">
    <template #action>
      <Button variant="icon" small square @click="showPassword = !showPassword"><Icon :size="21">{{ showPassword ? 'visibility_off' : 'visibility' }}</Icon></Button>
    </template>
  </Input>
</template>

