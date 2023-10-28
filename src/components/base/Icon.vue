<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  FILL: {
    type: [String, Number],
    default: '0',
  },
  wght: {
    type: [String, Number],
    default: '400',
  },
  opsz: {
    type: [String, Number],
    default: '48',
  },
  GRAD: {
    type: [String, Number],
    default: '0',
  },
  size: {
    type: [String, Number],
    default: '20',
  },
})
</script>

<template>
  <span class="material-symbols-outlined aspect-square font-variation"><slot></slot></span>
</template>

<style scoped>
.font-variation {
  font-variation-settings: 'FILL' v-bind('props.FILL'), 'wght' v-bind('props.wght'), 'GRAD' v-bind('props.GRAD'), 'opsz' v-bind('props.opsz');
  font-size: v-bind('`${props.size}px`');
}
</style>
