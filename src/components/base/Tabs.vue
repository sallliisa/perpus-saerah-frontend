<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Card from './Card.vue'
import type { PropType } from 'vue'
import { computed, useSlots, onBeforeMount, ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type TabVariants = 'pill' | 'block' | 'stack' | 'custom'

const props = defineProps({
  name: {
    type: String,
    required: false,
  },
  static: {
    type: Boolean,
    required: false,
    default: false,
  },
  view: {
    type: String,
    required: false,
    default: 'name',
  },
  config: {
    type: Array<any>,
    required: true,
  },
  variant: {
    type: String as PropType<TabVariants>,
    default: 'block',
  },
  additionalEmits: {
    type: Array<string>,
    required: false,
    default: [],
  },
  ignoreQuery: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'surface-lowest' | 'surface-low' | 'surface' | 'surface-high' | 'surface-highest'>,
    required: false,
    default: 'surface',
  }
})
const emit = defineEmits(['change'])

const router = useRouter()
const route = useRoute()

const modelValue = defineModel<number>()

const selectedTab = ref(0)
const name = props.name || String(route.name)

const getCurrentTab = () => {
  if (props.static || modelValue.value != undefined) selectedTab.value = modelValue.value ?? 0
  else if (!route.query[name + '_tab']) selectedTab.value = 0
  else selectedTab.value = Number(route.query[`${name}_tab`])
}

const changeTab = (idx: number) => {
  console.log('changing tab to', idx)
  selectedTab.value = idx
  if (!props.ignoreQuery) router.replace({ query: { ...route.query, [name + '_tab']: idx } })
  emit('change', idx)
  modelValue.value = idx
}

onMounted(() => {
  getCurrentTab()
  if (props.ignoreQuery && modelValue.value == undefined) {
    console.log('defaulting to 0 on', props.name)
    changeTab(0)
  }
  else changeTab(selectedTab.value)
  if (props.static) {
    watch(
      () => modelValue.value,
      (val) => {
        changeTab(val ?? 0)
      }
    )
  }
})

defineExpose({
  changeTab,
  getCurrentTab,
})
</script>

<template>
  <TabGroup v-if="props.variant == 'pill'" :selectedIndex="selectedTab" @change="changeTab">
    <TabList class="flex h-[88px] max-w-full justify-start overflow-auto rounded-full bg-c-surface-container dark:bg-cd-surface-container">
      <Tab v-for="tab in props.config" as="template" :key="tab" v-slot="{ selected }">
        <button class="overlay flex h-full w-full min-w-max items-center justify-center rounded-full px-6 py-0 font-bold after:hover:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:after:hover:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]" :class="selected ? 'bg-c-secondary-container text-c-on-secondary-container dark:bg-cd-secondary-container dark:text-cd-on-secondary-container' : 'text-c-on-surface dark:text-cd-on-surface'">
          <div v-if="!$slots.tabContent">{{ tab[props.view] }}</div>
          <slot v-else name="tabContent" v-bind="tab"></slot>
        </button>
      </Tab>
    </TabList>
  </TabGroup>

  <TabGroup v-if="props.variant == 'block'" :selectedIndex="selectedTab" @change="changeTab">
    <TabList class="flex flex-row gap-4 items-center flex-wrap">
      <Tab v-for="tab in props.config" as="template" :key="tab" v-slot="{ selected }">
        <Card interactive :color="selected ? 'primary' : color">
          <div>{{ tab[props.view] }}</div>
        </Card>
      </Tab>
    </TabList>
  </TabGroup>

  <TabGroup v-else-if="props.variant == 'stack'" :selectedIndex="selectedTab" @change="changeTab">
    <TabList>
      <div class="flex flex-col gap-2">
        <div v-if="!props.config.length" class="text-muted">Tidak ada data</div>
        <Tab v-else v-for="tab in props.config" as="template" :key="tab" v-slot="{ selected }">
          <Card class="flex-row items-center justify-between" interactive :color="selected ? 'primary' : color">
            <div>{{ tab[view] }}</div>
            <Icon>arrow_forward</Icon>
          </Card>
        </Tab>
      </div>
    </TabList>
  </TabGroup>

  <template v-else-if="props.variant == 'custom'">
    <TabGroup :selectedIndex="selectedTab" @change="changeTab">
      <TabList :key="JSON.stringify(props.config)" :class="($attrs.class as string)">
        <Tab v-for="(tab, index) in props.config" :key="tab" v-slot="{ selected }" :class="`text-start focus-visible:outline-none`">
          <slot name="tab" v-bind="{ tab, selected, index, props }"></slot>
        </Tab>
      </TabList>
    </TabGroup>
  </template>
</template>
