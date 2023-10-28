import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue'

const open = ref(true)
const index = ref(0)
const visible = ref(false)

watch([open, index, visible], ([open, index, visible]) => {
  localStorage.setItem('sidebarData', JSON.stringify({
    open: open,
    index: index,
    visible: visible
  }))
}, {deep: true})

if (localStorage.getItem('sidebarData')) {
  const data = JSON.parse(localStorage.getItem('sidebarData') || '')
  if (data) {
    open.value = data.open
    index.value = data.index
    visible.value = data.visible
  }
}

export const useSidebarStore = defineStore('sidebar', () => {
  function setOpen(value: boolean) {
    open.value = value
  }
  function setIndex(value: number) {
    index.value = value
  }
  function resetState() {
    open.value = false
    index.value = -1
  }
  function toggleOpen() {
    open.value = !open.value
  }
  function toggleVisibility() {
    visible.value = !visible.value
  }

  return { open, index, visible, setOpen, setIndex, resetState, toggleOpen, toggleVisibility }
})
