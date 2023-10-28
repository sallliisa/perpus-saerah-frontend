<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  ignore: {
    type: Array<string>,
    required: false,
    default: () => ([])
  }
})

const target = ref()
const open = ref(false);
const id = `popover-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`

onClickOutside(
  target,
  (data) => {
    console.log(data)
    open.value = false
  },
  { ignore: ['#' + id, '#file', ...props.ignore] }
)

function setOpen(value: boolean) {
  open.value = value
}
</script>

<template>
  <div :class="`relative`">
    <button :id="id" @click="setOpen(!open)" type="button">
      <slot name="trigger"></slot>
    </button>
    <div v-if="open" ref="target" :class="`absolute mt-2 z-10 ${$attrs.class}`">
      <slot name="content" v-bind="{setOpen}"></slot>
    </div>
  </div>
</template>