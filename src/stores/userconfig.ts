import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { BaseCRUDConfig } from '@/types'
import services from '@/utils/services'
import { JSONfn } from '@/utils/common'

const value = ref<any>({})

watch(
  value,
  (value) => {
    localStorage.setItem('userconfig', JSON.stringify(value))
  },
  { deep: true }
)

if (localStorage.getItem('userconfig')) {
  const data = localStorage.getItem('userconfig')
  if (data) {
    value.value = JSON.parse(data)
  }
}

export const userConfig = defineStore('userconfig', () => {
  function saveUserConfig(name: string, model: any) {
    value.value[name] = model
  }
  function removeUserConfig(name: string) {
    delete value.value[name]
  }
  function resetUserConfig() {
    value.value = {}
  }
  function clientGet(name: string) {
    return value.value[name]
  }
  function exists(name: string) {
    console.log(value.value)
    return value.value[name] !== undefined
  }
  async function get(configName: string) {
    let userConfig = null
    if (exists(configName)) {
      userConfig = clientGet(configName)
    } else {
      // await services
      //   .get(`public/app-configs`, {path: `${configName}.json`})
        // .then((res) => {
        //   userConfig = res
        //   saveUserConfig(configName as string, userConfig)
        // })
        // .catch((err) => {
        //   console.log(err)
        // })
      await import(`../app/configs/${configName}.json`).then((res) => {
        userConfig = res.default
        // saveUserConfig(configName as string, userConfig)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    return JSONfn.parse(JSON.stringify(userConfig))
  }
  async function getPrefetchConfig() {
    resetUserConfig()
    // return await services.get(`public/app-configs/prefetched-configs.json`).then((res) => {
    //   res.forEach((configName: string) => {
    //     get(configName)
    //   })
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  return { value, saveUserConfig, removeUserConfig, resetUserConfig, clientGet, exists, get, getPrefetchConfig }
})
