import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const value = ref<any>({})

export const softReload = defineStore('softreload', () => {
  function triggerChange(key: string) {
    console.log('changing', key)
    if ((value.value as any)[key] == undefined) {
      ;(value.value as any)[key] = false
    } else {
      ;(value.value as any)[key] = !(value.value as any)[key]
    }
  }

  function destroy(key: string) {
    delete (value.value as any)[key]
  }

  function destroyAll() {
    value.value = {}
  }

  return { value, triggerChange, destroy, destroyAll }
})
