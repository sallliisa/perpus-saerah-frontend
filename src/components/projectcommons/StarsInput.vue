<script setup lang="ts">
const modelValue = defineModel()

const levels = ["Sangat Buruk", "Buruk", "Cukup", "Baik", "Sangat Baik"]
</script>

<template>
  <div class="flex flex-col gap-2 justify-center">
    <div class="flex flex-row items-center gap-2">
      <Icon v-for="(item, index) in Array(5)" @click="modelValue = index+1" :FILL="index < modelValue ? 1 : 0" :size="32" class="cursor-pointer">star</Icon>
    </div>
    <div v-if="modelValue != null" class="italic">{{ levels[modelValue-1] }}</div>
  </div>
</template>