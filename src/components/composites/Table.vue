<script setup lang="ts">
import { Chip } from '@/components/base/index'
import type { Action, StringObject } from '@/types'
import { truncate } from '@/utils/common'
import { computed, ref, onMounted, onBeforeMount, watch, defineAsyncComponent } from 'vue'
import type { PropType } from 'vue'
import { formatDate, formatCurrency, formatNumber } from '@/utils/common'
import { titleCase } from '@/utils/common'
import { DeleteConfirmationModal } from '@/components/composites/index'
import { filter, parse } from '@/filters'
import { Pagination } from '@/components/utils'
import services from '@/utils/services'
import FileComponent from '../base/FileComponent.vue'
import { defaultGetData } from '@/app/actions/Table'
import { componentTypeMap, parsedTypes } from './common/properties';

const props = defineProps({
  fields: {
    type: Array as PropType<string[]>,
    required: true,
  },
  headerFields: {
    type: Array<Array<any>>,
    required: false
  },
  fieldsAlias: {
    type: Object as PropType<StringObject<string>>,
    required: false,
    default: () => ({}),
  },
  data: {
    type: Array as PropType<any[]>,
    required: false,
  },
  getAPI: {
    type: String,
    required: false,
  },
  fieldsFormatter: {
    type: Object as PropType<StringObject<(value: any) => string>>,
    required: false,
    default: () => {return {}},
  },
  fieldsOverride: {
    type: Object as PropType<StringObject<StringObject<string>>>,
    required: false,
    default: () => {return {}},
  },
  fieldsType: {
    type: Object as PropType<StringObject<any>>,
    required: false,
    default: () => {return {}},
  },
  fieldsParse: {
    type: Object as PropType<StringObject<string>>,
    required: false,
    default: () => {return {}},
  },
  fieldsExclude: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  fieldsAlternateSource: {
    type: Object as PropType<StringObject<string>>,
    required: false,
    default: () => {return {}},
  },
  getQueryParameters: {
    type: Object as PropType<StringObject<any>>,
    required: false,
    default: () => ({}),
  },
  onDataLoaded: {
    type: Function as PropType<(data: any[]) => void>,
    required: false,
    default: () => {},
  },
  getData: {
    type: Function as PropType<(getAPI: string, getQueryParameters?: object) => Promise<{ data: StringObject<any>[]; dataInfo: StringObject<any> }>>,
    required: false,
    default: defaultGetData,
  },
  paginated: {
    type: Boolean,
    required: false,
    default: false,
  },
  sortable: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'primary-container' | 'secondary-container' | 'tertiary-container' | 'warning-container' | 'error-container' | 'info-container' | 'success-container' | 'surface-lowest' | 'surface-low' | 'surface' | 'surface-high' | 'surface-highest'>,
    required: false,
    default: 'surface-high',
  }
})

const colorMap = {
  primary: 'bg-c-primary dark:bg-cd-primary text-c-on-primary dark:text-cd-on-primary',
  secondary: 'bg-c-secondary dark:bg-cd-secondary text-c-on-secondary dark:text-cd-on-secondary',
  tertiary: 'bg-c-tertiary dark:bg-cd-tertiary text-c-on dark:text-cd-on',
  warning: 'bg-c-warning dark:bg-cd-warning text-c-on-warning dark:text-cd-on-warning',
  error: 'bg-c-error dark:bg-cd-error text-c-on-error dark:text-cd-on-error',
  info: 'bg-c-info dark:bg-cd-info text-c-on-info dark:text-cd-on-info',
  success: 'bg-c-success dark:bg-cd-success text-c-on-success dark:text-cd-on-success',
  "primary-container": "bg-c-primary-container dark:bg-cd-primary-container text-c-on-primary-container dark:text-cd-on-primary-container",
  "secondary-container": 'bg-c-secondary-container dark:bg-cd-secondary-container text-c-on-secondary-container dark:text-cd-on-secondary-container',
  "tertiary-container": 'bg-c-tertiary-container dark:bg-cd-tertiary-container text-c-on-container dark:text-cd-on-container',
  "warning-container": 'bg-c-warning-container dark:bg-cd-warning-container text-c-on-warning-container dark:text-cd-on-warning-container',
  "error-container": 'bg-c-error-container dark:bg-cd-error-container text-c-on-error-container dark:text-cd-on-error-container',
  "info-container": 'bg-c-info-container dark:bg-cd-info-container text-c-on-info-container dark:text-cd-on-info-container',
  "success-container": 'bg-c-success-container dark:bg-cd-success-container text-c-on-success-container dark:text-cd-on-success-container',
  'surface-lowest': 'bg-c-surface-container-lowest dark:bg-cd-surface-container-lowest text-c-on-surface dark:text-cd-on-surface',
  'surface-low': 'bg-c-surface-container-low dark:bg-cd-surface-container-low text-c-on-surface dark:text-cd-on-surface',
  surface: 'bg-c-surface-container dark:bg-cd-surface-container text-c-on-surface dark:text-cd-on-surface',
  'surface-high': 'bg-c-surface-container-high dark:bg-cd-surface-container-high text-c-on-surface dark:text-cd-on-surface',
  'surface-highest': 'bg-c-surface-container-highest dark:bg-cd-surface-container-highest text-c-on-surface dark:text-cd-on-surface',
}

const fields = computed<string[]>(() => props.fields.filter(item => !props.fieldsExclude.includes(item)))

const initialData = ref<StringObject<any>[]>([])
const dataInfo = ref<StringObject<any>>({})
const tableData = ref<StringObject<any>[]>([])
const loading = ref(true)
const rawData = ref()

const localGetQueryParameters = ref<StringObject<any>>({page: "1", limit: "10"})

watch(
  () => props.getQueryParameters,
  () => {
    localGetQueryParameters.value = {page: localGetQueryParameters.value.page, limit: localGetQueryParameters.value.limit, ...props.getQueryParameters}
  },
  { deep: true, immediate: true }
)

async function computeTableData(data: StringObject<any>[]) {
  const res: any[] = []
  console.log(data)
  data.forEach((row: StringObject<any>, index: number) => {
    res.push({})
    Object.keys(row).forEach((field) => {
      let label = row[props.fieldsAlternateSource[field] || field]
      if (props.fieldsOverride[field]) label = props.fieldsOverride[field][row[field]] || '-'
      else if (props.fieldsParse[field]) label = parse(props.fieldsParse[field], row[field])
      if (props.fieldsType[field]?.type === 'unit') label = `${label}${props.fieldsType[field]?.unit}`
      else if (parsedTypes.includes(props.fieldsType[field]?.type)) label = parse(props.fieldsType[field].type, row[field], 'parser')
      if (props.fieldsFormatter[field]) label = props.fieldsFormatter[field](row[field]) || '-'
      Object.assign(res[index], {[field]: {id: row[field], label}})
    })
  })
  return res
}

const getExternalData = async () => {
  console.log("CLOG: called getexternaldata")
  if (props.getAPI) {
    const res = await props.getData(props.getAPI, localGetQueryParameters.value)
    rawData.value = res
    initialData.value = res.data
    dataInfo.value = res.dataInfo
  }
}

async function loadData() {
  loading.value = true
  if (props.getAPI) await getExternalData()
  else if (props.data) initialData.value = props.data
  tableData.value = await computeTableData(initialData.value)
  props.onDataLoaded(initialData.value)
  loading.value = false
}

function handleFieldFilter(field: string) {
  if (localGetQueryParameters.value.sort_by === field) {
    if (localGetQueryParameters.value.sort === 'asc') localGetQueryParameters.value.sort = 'desc'
    else localGetQueryParameters.value.sort = 'asc'
  } else {
    localGetQueryParameters.value.sort_by = field
    localGetQueryParameters.value.sort = 'asc'
  }
}

loadData()
if (props.data) {
  watch(() => props.data, () => {
    loadData()
  }, {deep: true})
} 

console.log("CLOG: TABLE MOUNTED")
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="relative block w-full overflow-x-auto rounded-xl">
      <table v-if="tableData.length && !loading" class="w-full table-auto">
        <thead v-if="!$slots.thead">
          <tr v-if="!headerFields">
            <th v-if="$slots['l-tableActions']" class="sticky-left-head w-[1%] whitespace-nowrap p-2 text-left" :class="colorMap[color]"></th>
            <th v-for="field in fields" class="p-2 text-left text-c-on-surface dark:text-cd-on-surface" :class="colorMap[color]">
              <Button v-if="sortable" @click="handleFieldFilter(field)" variant="icon">
                <div class="text-c-on-surface dark:text-cd-on-surface">{{ fieldsAlias[field] ?? field }}</div>
                <Icon :class="`${localGetQueryParameters.sort_by === field ? 'opacity-100' : 'opacity-0'}`">{{ localGetQueryParameters.sort === 'asc' ? 'arrow_upward' : 'arrow_downward' }}</Icon>
              </Button>
              <div v-else class="text-c-on-surface dark:text-cd-on-surface">{{ fieldsAlias[field] ?? field }}</div>
            </th>
          </tr>
          <template v-else>
            <tr v-for="row in headerFields">
              <td v-for="column in row" :colspan="column.colspan" :rowspan="column.rowspan" :class="column.class">{{ fieldsAlias[column.id] ?? column.id }}</td>
            </tr>
          </template>
        </thead>
        <slot v-else name="thead" v-bind="{data: rawData, props}"></slot>
        <tbody v-if="!$slots.tbody">
          <tr v-if="$slots['l-prefix-row']"><slot name="l-prefix-row"></slot></tr>
          <tr v-for="(item, index) in tableData" class="group relative hover:bg-c-on-surface/[8%] dark:hover:bg-cd-on-surface/[8%]">
            <td v-if="$slots['l-tableActions']" class="h-[76px] px-8"><slot name="l-tableActions" v-bind="{data: initialData[index], index}"></slot></td>
            <td v-for="field in fields" class="px-2 h-[76px]">
              <slot v-if="$slots[`l-${field}`]" :name="`l-${field}`" v-bind="{data: initialData[index]}"/>
              <div v-else-if="fieldsType[field]?.type === 'chip-list'" class="flex flex-row flex-wrap items-center gap-2">
                <Chip v-for="data in item[field].label"><div class="min-w-max">{{ fieldsType[field]?.pick ? data[fieldsType[field]?.pick] : data }}</div></Chip>
              </div>
              <template v-else-if="item[field]">
                <component v-if="fieldsType[field]?.type && !parsedTypes.includes(fieldsType[field]?.type)" :is="componentTypeMap[fieldsType[field]?.type].component" v-bind="{...fieldsType[field]?.variants?.[item[field].id], ...Object.fromEntries(componentTypeMap[fieldsType[field].type].propKeyValue?.map((property) => [property[0], item[field].id?.[property[1]]]) || [])}">
                  {{ item[field].label }}
                </component>
                <template v-else>
                  <div class="w-max max-w-xs">{{ item[field].label }}</div>
                </template>
              </template>
            </td>
          </tr>
          <tr v-if="$slots['l-suffix-row']"><slot name="l-suffix-row" v-bind="{data: rawData}"></slot></tr>
        </tbody>
        <slot v-else name="tbody" v-bind="{data: rawData, props}"></slot>
      </table>
      <div v-else-if="loading" class="flex flex-col">
        <Card class="animate-pulse h-[49px]" color="surface-high"></Card>
        <div v-for="_ in Array(tableData?.length || 10)" class="py-8 h-[76px]">
          <Card class="animate-pulse h-full" color="surface-high"></Card>
        </div>
      </div>
      <template v-else>
        <div v-if="!$slots['l-emptyState']" class="flex items-center justify-center text-muted">
          Tidak ada data
        </div>
        <slot v-else name="l-emptyState"></slot>
      </template>
    </div>
    <Pagination v-if="props.paginated" v-model="localGetQueryParameters" :dataInfo="(dataInfo as any)" @update:modelValue="loadData()" />
  </div>
</template>