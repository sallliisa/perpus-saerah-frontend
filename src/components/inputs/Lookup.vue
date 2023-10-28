<script setup lang="ts">
import { defaultGetData, defaultFieldsAlias } from '@/app/actions/Lookup';
import type { StringObject } from '@/types';
import { ref, type PropType, watch, type ComputedRef, computed, onMounted } from 'vue';
import { commonProps } from './commonprops';
import SearchBox from '../composites/SearchBox.vue';
import Checkbox from './Checkbox.vue';
import Radio from './Radio.vue';
import services from '@/utils/services';
import BaseInput from './BaseInput.vue';
import Form from '../composites/Form.vue';

const props = defineProps({
  ...commonProps,
  getData: {
    type: Function as PropType<(getAPI: string, getQueryParameters?: object) => Promise<any>>,
    default: defaultGetData
  },
  getAPI: {
    type: String,
    required: true
  },
  showAPI: {
    type: String,
    required: false,
    default: ''
  },
  onSaveData: {
    type: Function as PropType<(data: any) => any>,
    default: () => {}
  },
  getQueryParameters: {
    type: Object as PropType<StringObject>,
    default: () => ({})
  },
  allowMulti: {
    type: Boolean,
    default: false
  },
  pick: {
    type: String,
    default: 'id'
  },
  transform: {
    type: Object,
  },
  view: {
    type: [String, Array<string>],
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'Pilih'
  },
  fieldsAlias: {
    type: Object,
    default: () => ({})
  },
  filterFormProps: {
    type: Object
  }
})

const modelValue = defineModel()

const fieldsAlias = {...defaultFieldsAlias, ...props.fieldsAlias}
const isFilterSectionOpen = ref(false)
const loading = ref(true)
const params = ref({
  page: 1,
  limit: 10,
  sort_by: '',
  sort: 'DESC',
  search: "",
  ...props.getQueryParameters,
})
const dataInfo = ref({
  total: 0,
  totalPage: 0,
})
const data = ref<Array<StringObject<any>>>()
const inputValue = ref()
const view = !Array.isArray(props.view) ? [props.view] : props.view

async function getExternalData() {
  const result = await props.getData(props.getAPI, {...params.value})
  data.value = result.data
  dataInfo.value = result.dataInfo
  if (props.transform) {
    const transformedData = JSON.parse(JSON.stringify(result.data))
    const entries = Object.entries(props.transform)
    transformedData.forEach((item: any) => {
      entries.forEach(entry => {
        item[entry[1]] = item[entry[0]]
        delete item[entry[0]]
      })     
    })
    console.log('transform', props.transform, transformedData)
    data.value = transformedData
  } else data.value = result.data
}

async function preflight() {
  loading.value = true
  if (modelValue.value) inputValue.value = modelValue.value
  await getExternalData()
  if (inputValue.value) {
    if (!props.allowMulti) {
      const { data } = await services.single(props.getAPI, inputValue.value)
      inputValue.value = data
    } else {
      inputValue.value = modelValue.value
    }
  } else {
    if (props.allowMulti) inputValue.value = []
    else inputValue.value = {}
  }
  loading.value = false
}

onMounted(async () => {
  await preflight()
})

function updateModelValue() {
  if (!props.allowMulti) modelValue.value = inputValue.value[props.pick]
  else modelValue.value = inputValue.value?.length ? inputValue.value : undefined
}

function handleItemClick(item: any) {
  if (!props.allowMulti) inputValue.value = item
  else {
    if (inputValue.value.find((selected: any) => selected[props.pick] === item[props.pick])) {
      inputValue.value = inputValue.value.filter((selected: any) => selected[props.pick] !== item[props.pick])
    } else {
      inputValue.value.push(item)
    }
  }
  updateModelValue()
}

function handleRemoveItem(index: number = -1) {
  if (props.allowMulti) inputValue.value.splice(index, 1)
  else inputValue.value = {}
}

watch(() => params.value.search, () => {
  params.value.page = 1
})

watch(params, () => {
  getExternalData()
}, {deep: true})

async function commit() {
  await props.onSaveData(inputValue.value)
}
</script>

<template>
  <BaseInput v-bind="props">
    <Button v-if="loading" class="w-[70px] bg-c-surface-container-high dark:bg-cd-surface-container-high animate-pulse"></Button>
    <Modal v-else>
      <template #trigger>
        <template v-if="!$slots.trigger">
          <Button v-if="props.allowMulti" :variant="inputValue.length ? 'filled' : 'outlined'">{{ inputValue.length ? `${inputValue.length} Terpilih` : placeholder }}</Button>
          <Button v-else :variant="inputValue[pick] ? 'filled' : 'outlined'">{{ inputValue[view[0]] || props.placeholder }}</Button>
        </template>
        <slot v-else name="trigger"></slot>
      </template>
      <template #content="{closeModal}">
        <div class="flex flex-col gap-4" id="form-lookup">
          <div class="flex flex-row items-center gap-4">
            <SearchBox v-model="params.search" class="w-full"/>
            <Button v-if="filterFormProps" :variant="isFilterSectionOpen ? 'filled' : 'outlined'" square @click="() => isFilterSectionOpen = !isFilterSectionOpen"><Icon>filter_alt</Icon></Button>
          </div>
          <Form static v-model="params" v-bind="(filterFormProps as any)">
            <template #submitButton>
              <Button @click="params = ({search: params.search} as any)">Reset Filter</Button>
            </template>
          </Form>
          <div class="flex flex-row gap-2 items-center overflow-auto max-w-full">
            <Chip v-if="props.allowMulti && inputValue.length" v-for="(item, index) in inputValue" interactive @click="handleRemoveItem(index)" class="min-w-max flex flex-row items-center">
              <div>{{ item[view[0]] }}</div>
              <Icon size="14">close</Icon>
            </Chip>
            <div v-else-if="!props.allowMulti && inputValue[pick]">
              <Chip interactive @click="handleRemoveItem()" class="min-w-max flex flex-row items-center">
                <div>{{ inputValue[view[0]] }}</div>
                <Icon size="14">close</Icon>
              </Chip>
            </div>
            <div v-else class="min-h-[25px] max-h-[25px] text-muted">Klik item untuk memilih</div>
          </div>
          <table v-if="data?.length">
            <thead>
              <tr>
                <th class="bg-c-surface-container-high dark:bg-cd-surface-container-high text-c-on-surface dark:text-cd-on-surface py-2"></th>
                <th v-for="field in view" class="bg-c-surface-container-high dark:bg-cd-surface-container-high text-c-on-surface dark:text-cd-on-surface py-2">{{ fieldsAlias[field] ?? field }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in data" @click="handleItemClick(item)" class="hover:bg-c-on-surface/[8%] dark:hover:bg-cd-on-surface/[8%]">
                <td class="p-4 w-[1%] whitespace-nowrap">
                  <Radio v-if="!props.allowMulti" :checked="inputValue[pick] === item[pick]"/>
                  <Checkbox v-else disableHelperMessage :modelValue="!!inputValue.find((selected: any) =>  selected[pick] === item[pick])"/>
                </td>
                <td v-for="field in view">{{ item[field] }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-muted">Tidak ada data</div>
          <div class="flex flex-row justify-between items-center">
            <Pagination v-if="data" disableLengthControl :dataInfo="{...dataInfo, length: data.length}" :dataLength="data.length" v-model="params"/>
            <Button @click="async () => {await commit(); closeModal()}">Simpan</Button>
          </div>
        </div>
      </template>
    </Modal>
  </BaseInput>
</template>