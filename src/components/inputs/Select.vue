<script setup lang="ts">
import { defaultGetData } from '@/app/actions/Select';
import type { StringObject } from '@/types';
import { ref, type PropType, watch, computed, type ComputedRef, onMounted } from 'vue';
import { commonProps } from './commonprops';
import BaseInput from './BaseInput.vue';
import Popover from '@/components/base/Popover.vue';
import Input from '@/components/inputs/Input.vue';

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: 'Pilih'
  },
  items: {
    type: Array<StringObject>,
    required: false,
    default: []
  },
  getAPI: {
    type: String,
    required: false,
    default: ''
  },
  getQueryParameters: {
    type: Object as PropType<StringObject>,
    required: false,
    default: {}
  },
  getData: {
    type: Function as PropType<(getAPI: string, getQueryParameters: object) => Promise<Array<any>>>,
    required: false,
    default: defaultGetData
  },
  defaultToFirst: {
    type: Boolean,
    required: false,
    default: false
  },
  pick: {
    type: String,
    required: false,
    default: 'id'
  },
  view: {
    type: String,
    required: false,
    default: 'name'
  },
  allowMulti: {
    type: Boolean,
    required: false,
    default: false
  },
  searchable: {
    type: Boolean,
    required: false,
    default: false
  },
  ...commonProps
})

const modelValue = defineModel<string | any[]>()
if (!modelValue.value) {
  if (props.allowMulti) modelValue.value = []
}

const loading = ref(true)
const items = ref<Array<any>>([])
const query = ref('')
const error = ref('')
const selected = ref<any[] | StringObject | null>()

let displayValue: ComputedRef<string>
const filteredItems = computed(() => {
  if (query.value) return items.value.filter((item: any) => item[props.view].toLowerCase().includes(query.value.toLowerCase()))
  else return items.value
})

function pickSelected() {
  if (props.allowMulti) {
    if (modelValue.value?.length) (selected.value as any[]) = items.value.filter((item: any) => (modelValue.value as any[]).find((modelItem: any) => String(modelItem[props.pick]) === String(item[props.pick])))
    else selected.value = props.defaultToFirst ? [items.value[0]] : []
  } else {
    if (modelValue.value) {
      selected.value = items.value.find((item: any) => String(item[props.pick]) === String(modelValue.value))
    }
    else {
      selected.value = props.defaultToFirst ? items.value[0] : null
    }
  }
}

async function preflight() {
  if (props.getAPI) items.value = await props.getData(props.getAPI, props.getQueryParameters)
  else items.value = props.items
  pickSelected()
  console.log('picked selected', selected.value)
  displayValue = computed(() => {
    if (props.allowMulti) {
      if (selected.value?.length) return (selected.value as any[]).slice(0, 2).map(item => item[props.view]).join(', ') + ((selected.value as any[]).length > 2 ? `, dan ${(selected.value as any[]).length - 2} lainnya` : '')
      else return ''
    } else {
      if (selected.value) return (selected.value as any)[props.view]
      else return ''
    }
  })
  loading.value = false
  updateModelValue()
}

function updateModelValue() {
  if (props.allowMulti) {
    modelValue.value = (selected.value as any[] || []).map(item => {
      return {[props.pick]: item[props.pick]}
    })
  } else modelValue.value = (selected.value as any)[props.pick]
}

function handleItemClick(item: any, setOpen: Function) {
  if (!props.allowMulti) {
    selected.value = item
    setOpen(false)
  } else {
    if ((modelValue.value as any[]).map(item => item[props.pick]).includes(item[props.pick])) selected.value = (selected.value as any[]).filter((selectedItem: any) => selectedItem[props.pick] !== item[props.pick])
    else selected.value = [...(selected.value as any[]), item]
  }
  updateModelValue()
}

preflight()

onMounted(() => {
  watch(modelValue, () => {
    if (modelValue === undefined) pickSelected()
    if (props.required) {
      if (props.allowMulti) error.value = !((modelValue.value as any[])).length ? 'Harus diisi!' : ''
      else error.value = !modelValue.value ? 'Harus diisi!' : ''
    }
  })
})
</script>

<template>
  <BaseInput v-bind="props" :error="error">
    <Popover :key="displayValue">
      <template #trigger>
        <button :key="String(loading)" class="rounded-lg px-4 py-2 bg-c-surface-container-high dark:bg-cd-surface-container-high flex flex-row gap-2 items-center">
          <p v-if="displayValue">{{ displayValue }}</p>
          <p v-else class="text-muted">{{ placeholder }}</p>
          <Icon>expand_more</Icon>
        </button>
      </template>
      <template #content="{setOpen}">
        <Card color="surface-high" class=" max-h-80 overflow-auto">
          <div v-if="props.searchable" class="sticky top-0 z-10 bg-c-surface-container-high dark:bg-cd-surface-container-high">
            <Input v-model="query" placeholder="Cari..." icon="search" />
          </div>
          <template v-if="filteredItems.length">
            <Card v-for="item in filteredItems" color="surface-high" interactive class="px-4 py-2 flex flex-row items-center justify-between gap-4" @click="handleItemClick(item, setOpen)">
              <div>{{ item[view] }}</div>
              <Icon v-if="allowMulti && Array.isArray(modelValue)" :class="modelValue.map((item) => item[pick]).includes(item[pick]) ? 'opacity-100' : 'opacity-0'">check</Icon>
              <Icon v-else :class="String(modelValue) === item[pick] ? 'opacity-100' : 'opacity-0'">check</Icon>
            </Card>
          </template>
          <p v-else class="text-muted text-xs">Tidak ada data</p>
        </Card>
      </template>
    </Popover>
  </BaseInput>
</template>