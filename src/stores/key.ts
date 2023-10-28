import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useKey = defineStore('key', () => {
  const value = ref<number>(1)
  function refreshKey() {
    if (value.value === 1) {
      value.value--
    } else {
      value.value++
    }
  }
  return { value, refreshKey }
})
