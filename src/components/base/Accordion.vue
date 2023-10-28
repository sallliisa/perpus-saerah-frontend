<script setup lang="ts">
import { ref, type PropType } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'primary-container' | 'secondary-container' | 'tertiary-container' | 'warning-container' | 'error-container' | 'info-container' | 'success-container' | 'surface-lowest' | 'surface-low' | 'surface' | 'surface-high' | 'surface-highest'>,
    required: false,
    default: 'surface',
  },
  unmount: {
    type: Boolean,
    default: true
  }
})

const isOpen = ref(props.isOpen)
</script>

<template>
  <div class="flex flex-col">
    <Card :interactive="!!$slots.content" :class="isOpen ? 'rounded-b-none' : ''" @click="() => {if (!!$slots.content) isOpen = !isOpen}" :color="color">
      <slot v-bind="{isOpen}" interactive name="trigger"></slot>
    </Card>
    <Card v-if="unmount ? isOpen : true" v-show="isOpen" class="rounded-t-none" :color="color">
      <slot v-if="$slots.content" v-bind="{isOpen}" name="content"></slot>
    </Card>
  </div>
</template>