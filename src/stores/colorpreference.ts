import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const value = ref('light')

watch(
  value,
  (value) => {
    localStorage.setItem('colorpreference', value)
  },
  { deep: true }
)

if (localStorage.getItem('colorpreference')) {
  const data = localStorage.getItem('colorpreference')
  if (data) {
    value.value = data
  }
}

export const useColorPreference = defineStore('colorpreference', () => {
  function switchTo(mode: 'dark' | 'light') {
    value.value = mode
  }
  function getCurrentValue() {
    return value.value
  }
  function isDark() {
    return value.value === 'dark'
  }
  function isLight() {
    return value.value === 'light'
  }
  return { value, getCurrentValue, isDark, isLight, switchTo }
})
