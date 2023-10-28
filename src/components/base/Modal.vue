<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useColorPreference } from '@/stores/colorpreference'

const emit = defineEmits(['update:isOpen'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  onClose: {
    type: Function,
    required: false,
    default: () => null,
  },
  onOpen: {
    type: Function,
    required: false,
    default: () => null,
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'>,
    default: '6xl'
  }
})

const isOpen = ref(props.isOpen)

function closeModal() {
  isOpen.value = false
  props.onClose()
}
function openModal() {
  props.onOpen()
  isOpen.value = true
}
watch(isOpen, (val) => {
  emit('update:isOpen', val)
})

const sizeMap = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  'full': 'max-w-full',
}
</script>

<template>
  <div type="button" @click="openModal" :class="($attrs.class as string)">
    <slot name="trigger" v-bind="openModal"></slot>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10" id="dialog" :class="useColorPreference().getCurrentValue()">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-100 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-100 ease-in" leave-from="opacity-50 scale-100" leave-to="opacity-0 scale-95">
            <div class="fixed inset-0 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel :class="sizeMap[size]" class="w-full max-w- transform rounded-3xl bg-c-surface-container p-6 text-left align-middle text-c-on-surface transition-all dark:bg-cd-surface-container dark:text-cd-on-surface">
                  <div class="flex flex-col gap-4">
                    <DialogTitle as="h3" class="text-2xl">
                      <div class="flex w-full flex-row items-center justify-between">
                        <template v-if="$slots.title">
                          <slot name="title" v-bind="{ closeModal }"></slot>
                        </template>
                        <div v-else>{{ props.title }}</div>
                      </div>
                    </DialogTitle>
                    <div v-if="$slots.content" class="text-c-on-surface-variant dark:text-cd-on-surface-variant">
                      <slot name="content" v-bind="{ closeModal }"></slot>
                    </div>

                    <div v-if="$slots.footer">
                      <div class="flex flex-row items-center justify-end gap-2">
                        <slot name="footer" v-bind="{ closeModal }"></slot>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
