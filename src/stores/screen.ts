import { ref } from 'vue'
import { defineStore } from 'pinia'

const state = ref(0)

export const useScreenStore = defineStore('screen', () => {
  function set(value: number) {
    state.value = value
  }
  function is(val: string) {
    const names = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    return (state.value = names.indexOf(val))
  }
  function isAtLeast(val: string) {
    const names = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    return state.value >= names.indexOf(val)
  }
  function isOrLess(val: string) {
    const names = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    return state.value <= names.indexOf(val)
  }

  return { state, set, is, isAtLeast, isOrLess }
})
