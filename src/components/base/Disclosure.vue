<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const panelState = ref(props.open)

watch(
  () => props.open,
  (value: boolean) => {
    panelState.value = value
  }
)
</script>

<template>
  <div class="w-full">
    <Disclosure v-slot="{ open }">
      <DisclosureButton @click="panelState = !panelState" class="w-full">
        <div :class="panelState ? 'bg-c-secondary-container text-c-on-secondary-container dark:bg-cd-secondary-container dark:text-cd-on-secondary-container' : 'bg-c-surface-container-high text-c-on-surface dark:bg-cd-surface-container-high dark:text-cd-on-surface'" class="overlay flex w-full flex-row items-center justify-between rounded-xl py-2 px-4 after:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:after:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]">
          <div class="flex flex-col">
            <div class="dark:text-cd-white-text text-start">{{ props.title }}</div>
            <div v-if="props.description" class="text-start text-sm">{{ props.description }}</div>
          </div>
          <Icon :size="32">{{ !panelState ? 'expand_more' : 'expand_less' }}</Icon>
        </div>
      </DisclosureButton>
      <div v-show="panelState">
        <DisclosurePanel static>
          <slot></slot>
        </DisclosurePanel>
      </div>
    </Disclosure>
  </div>
</template>
