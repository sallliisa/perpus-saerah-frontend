<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot } from '@headlessui/vue'
import services from '@/utils/services'
import type { StringObject } from '@/types'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  items: {
    type: Array<Object>,
    required: false,
  },
  modelAPI: {
    type: String,
    required: false,
  },
  pick: {
    type: String,
    required: false,
    default: 'id',
  },
  getQueryParameters: {
    type: Object,
    required: false,
  },
  view: {
    type: String,
    required: false,
    default: 'name',
  },
  modelValue: {
    type: [String, Array<string>],
    required: false,
  },
  initialBlank: {
    type: Boolean,
    required: false,
    default: true,
  },
  allowMulti: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Pilih data',
  },
})

const items = ref(props.items ? props.items : [])
const selected = ref<any>()
let filteredItem: any = null

const getInitialData = async () => {
  if (!props.modelAPI) return
  const targetAPI = props.modelAPI.slice(-7) === '?custom' ? props.modelAPI.slice(0, -7) : `${props.modelAPI}/dataset`
  return await services.get(targetAPI, props.getQueryParameters).then((res: any) => {
    items.value = res.data
  })
}

const preflight = () => {
  if (props.initialBlank) {
    if (props.modelValue) {
      if (!props.allowMulti) selected.value = items.value.find((item: any) => item[props.pick] == props.modelValue)
      else selected.value = props.modelValue
    } else {
      selected.value = !props.allowMulti ? null : []
    }
  } else if (props.modelValue) {
    if (!props.allowMulti) selected.value = items.value.find((item: any) => item[props.pick] == props.modelValue)
    else selected.value = props.modelValue
  } else {
    selected.value = !props.allowMulti ? items.value[0] : [items.value[0] || null]
  }
  if (!props.initialBlank) updateValue()
  filteredItem = computed(() => (query.value === '' ? items.value : items.value.filter((item: any) => item[props.view as string].toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, '')))))
}

const updateValue = () => {
  if (props.allowMulti) emit('update:modelValue', selected.value?.map((item: any) => {return {[props.pick]: item[props.pick]}}))
  else if (!props.allowMulti) emit('update:modelValue', selected.value?.[props.pick])
}

const query = ref('')

onBeforeMount(async () => {
  if (!props.items) await getInitialData()
  preflight()
  watch(selected, () => {
    updateValue()
  })
})

const displayFormatter = (item: Array<string> | Array<StringObject>) => {
  if (item) {
    if (!props.allowMulti) return (item as any)[props.view as string]
    else return (item as Array<StringObject>).map((item) => item[props.view as string]).join(', ')
  }
}
</script>

<template>
  <Combobox :multiple="props.allowMulti" v-model="selected" class="w-full">
    <div class="relative">
      <div class="relative w-full cursor-default overflow-hidden text-left sm:text-sm">
        <ComboboxInput :placeholder="props.placeholder" class="flex h-[35px] w-full flex-row items-center gap-2 rounded-md bg-c-surface-container-highest px-6 py-2 text-c-on-surface placeholder:text-base dark:bg-cd-surface-container-highest dark:text-cd-on-surface" @change="query = $event.target.value" :displayValue="(item: any) => displayFormatter(item)" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon class="h-5 w-5 text-gray-400" aria-hidden="true">unfold_more</Icon>
        </ComboboxButton>
      </div>
      <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
        <ComboboxOptions class="absolute z-50 mt-2 max-h-60 w-full transform overflow-auto rounded-md bg-c-surface-container-highest py-1 text-base text-c-on-surface dark:bg-cd-surface-container-highest dark:text-cd-on-surface sm:text-sm">
          <div v-if="filteredItem.length === 0 && !query" class="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>

          <ComboboxOption v-for="(item, index) in filteredItem" as="template" :value="item" v-slot="{ selected, active }" @click="updateValue">
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-c-surface-container-high text-c-on-surface dark:bg-cd-surface-container-high dark:text-cd-on-surface': active,
                'bg-c-surface-container-highest text-c-on-surface dark:bg-cd-surface-container-highest dark:text-cd-on-surface': !active,
              }"
            >
              <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                {{ (item as any)[props.view as string] }}
              </span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon class="dark:text-cd-white-text text-c-primary dark:text-cd-primary" aria-hidden="true">check</Icon>
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
