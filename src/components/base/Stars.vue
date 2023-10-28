<script setup lang="ts">
const props = defineProps({
  value: {
    type: [Number, String],
    required: true
  },
  outOf: {
    type: [Number, String],
    default: 5
  }
})

function isRound(n: number) {
  return (n - Math.floor(n)) === 0
}
</script>

<template>
  <div class="flex flex-row items-center gap-1">
    <Icon v-for="item in Array(Math.floor(Number(value)))" :FILL="1">star</Icon>
    <Icon v-if="!isRound(Number(value))">star_half</Icon>
    <Icon v-for="item in Array(Number(outOf) - Math.ceil(Number(value)))">star</Icon>
  </div>
</template>