<script setup lang="ts">
import { defaultGetData, defaultOnDataLoaded } from '@/app/actions/Detail';
import { parse } from '@/filters';
import type { StringObject } from '@/types';
import { computed, ref, type PropType, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { componentTypeMap, parsedTypes } from './common/properties';
import MapView from '../base/MapView.vue';
import FileComponent from '../base/FileComponent.vue';

const props = defineProps({
  fields: {
    type: Array as PropType<string[]>,
    required: true,
  },
  fieldsExclude: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  fieldsAlias: {
    type: Object as PropType<StringObject<string>>,
    required: false,
    default: () => ({}),
  },
  data: {
    type: Object as PropType<StringObject<any>>,
    required: false,
  },
  showAPI: {
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
  getQueryParameters: {
    type: Object as PropType<StringObject<any>>,
    required: false,
    default: () => ({}),
  },
  fieldsAlternateSource: {
    type: Object as PropType<StringObject<string>>,
    required: false,
    default: () => {return {}},
  },
  onDataLoaded: {
    type: Function as PropType<(data: StringObject<any>) => void>,
    required: false,
    default: defaultOnDataLoaded,
  },
  getData: {
    type: Function as PropType<(showAPI: string, id: string | number, getQueryParameters?: object) => Promise<StringObject<any>>>,
    required: false,
    default: defaultGetData,
  },
  showIdKey: {
    type: String,
    required: false,
  },
  showDataId: {
    type: String,
    required: false,
  },
  columns: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['update:modelValue'])

const route = useRoute()

const fields = computed(() => props.fields.filter(field => field.slice(0, 2) !== 'S|').filter(field => !props.fieldsExclude.includes(field)))

const initialData = ref<StringObject<any>>({})
const detailData = ref<StringObject<any>>()
const loading = ref<boolean>(true)

async function computeDetailData(data: StringObject<any>) {
  const res = {}
  Object.keys(data).forEach((field) => {
    let label = data[props.fieldsAlternateSource[field] || field]
    if (props.fieldsOverride[field]) label = props.fieldsOverride[field][data[field]] || '-'
    else if (props.fieldsParse[field]) label = parse(props.fieldsParse[field], data[field])
    if (props.fieldsType[field]?.type === 'unit') label = `${label}${props.fieldsType[field]?.unit}`
    else if (parsedTypes.includes(props.fieldsType[field]?.type)) label = parse(props.fieldsType[field].type, data[field], 'parser')
    if (props.fieldsFormatter[field]) label = props.fieldsFormatter[field](label) || '-'
    Object.assign(res, {[field]: {id: data[field], label}})
  })
  return res
}
async function getExternalData() {
  if (props.showAPI) initialData.value = await props.getData(props.showAPI, String(route.query[props.showIdKey || ''] || props.showDataId), props.getQueryParameters)
}

async function loadData() {
  loading.value = true
  if (props.data) initialData.value = props.data
  else if (props.showAPI) await getExternalData()
  detailData.value = await computeDetailData(initialData.value)
  props.onDataLoaded(initialData.value)
  emit('update:modelValue', initialData.value)
  loading.value = false
}

loadData()
</script>

<template>
  <template v-if="!loading && detailData">
    <table>
      <!-- <thead>
        <tr>
          <td v-for="_ in columns*3"></td>
        </tr>
      </thead> -->
      <tbody>
        <tr v-for="field in fields">
          <td class="w-[1%] whitespace-nowrap">{{ fieldsAlias[field] ?? field }}</td>
          <td class="px-4 w-[1%] whitespace-nowrap">:</td>
          <td class="py-2">
            <slot v-if="$slots[`s-${field}`]" :name="`s-${field}`" v-bind="{data: initialData}"></slot>
            <template v-else-if="detailData[field]?.id">
              <div v-if="fieldsType[field]?.type === 'location'">
                <MapView :location="detailData[field].id"/>
              </div>
              <div v-if="fieldsType[field]?.type === 'file'" class="flex flex-row items-center gap-4">
                <div v-if="detailData[field]?.label">
                  <template v-if="Array.isArray(detailData[field]?.id)">
                    <template v-if="detailData[field]?.id?.length">
                      <FileComponent v-for="file in detailData[field]?.id" :filename="file.file" :ext="file.file.split('.')[1]" :url="file.preview"/>
                    </template>
                    <div v-else>-</div>
                  </template>
                  <FileComponent v-else :filename="detailData[field]?.id.file" :ext="detailData[field]?.id.file.split('.')[1]" :url="detailData[field]?.id.preview"/>
                </div>
                <div v-else>-</div>
              </div>
              <div v-else-if="fieldsType[field]?.type === 'chip-list'" class="flex flex-row flex-wrap items-center gap-2">
                <Chip v-for="item in detailData[field].label"><div class="min-w-max">{{ fieldsType[field].pick ? item[fieldsType[field].pick] : item }}</div></Chip>
              </div>
              <component v-else-if="fieldsType[field]?.type && !parsedTypes.includes(fieldsType[field]?.type)" :is="componentTypeMap[fieldsType[field]?.type].component" v-bind="{...fieldsType[field]?.variants?.[detailData[field].id], ...Object.fromEntries(componentTypeMap[fieldsType[field].type].propKeyValue?.map((property) => [property[0], detailData?.[field].id[property[1]]]) || [])}">
                {{ detailData[field]?.label }}
              </component>
              <template v-else>{{ detailData[field]?.label }}</template>
            </template>
            <div v-else>-</div>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>