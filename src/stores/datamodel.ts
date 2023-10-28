import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import services from '@/utils/services'
import { JSONfn } from '@/utils/common'

type DataModel = {
  table: string
  primaryKey: string
  isList: boolean
  isView: boolean
  isEdit: boolean
  isAdd: boolean
  isDelete: boolean
  fieldList: Array<string>
  fieldListCustom?: Array<string>
  fieldView: Array<string>
  fieldViewCustom?: Array<string>
  fieldEdit: Array<string>
  fieldEditCustom?: Array<string>
  fieldAdd: Array<string>
  fieldAddCustom: Array<string>
  fieldReadOnly: Array<string>
  fieldFilterable: Array<{ [key: string]: { operator: string } }>
  fieldSearchable: Array<string>
  fieldType: Array<{ [key: string]: string }>
  fieldRelation: Array<any>
  fieldValidation: Array<{ [key: string]: string }>
  parentChild: Array<any>
}

const value = ref<{ [key: string]: DataModel }>({})

watch(
  value,
  (value) => {
    localStorage.setItem('datamodel', JSON.stringify(value))
  },
  { deep: true }
)

if (localStorage.getItem('datamodel')) {
  const data = localStorage.getItem('datamodel')
  if (data) {
    value.value = JSON.parse(data)
  }
}

export const useDataModel = defineStore('datamodel', () => {
  function saveDataModel(name: string, model: any) {
    value.value[name] = model
  }
  function removeDataModel(name: string) {
    delete value.value[name]
  }
  function resetDataModel() {
    value.value = {}
  }
  function clientGet(name: string) {
    return value.value[name]
  }
  function exists(name: string) {
    return value.value[name] !== undefined
  }
  async function getDataModel(name: string) {
    let dataModel = null
    if (exists(name)) {
      dataModel = clientGet(name)
    } else {
      await services
        .get(`${name}/gen-model`)
        .then((res) => {
          dataModel = res.data
          useDataModel().saveDataModel(name as string, dataModel)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return JSONfn.parse(JSON.stringify(dataModel || {}))
  }
  return { value, saveDataModel, removeDataModel, resetDataModel, clientGet, exists, getDataModel }
})
