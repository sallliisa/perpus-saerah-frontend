<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ref, watch } from 'vue'
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  square: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableControls: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isOpen = ref(props.isOpen)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <div v-if="!$slots.trigger" :class="twMerge('relative flex aspect-square h-40 min-h-[120px] items-center justify-center rounded-xl bg-c-surface-container-high dark:bg-cd-surface-container-high', $attrs.class as string)">
    <div v-if="!props.disableControls && (props.thumbnail || props.url)" class="absolute flex h-full w-full flex-row items-center justify-center gap-2 rounded-xl bg-black/[12%] text-c-on-surface opacity-0 transition-opacity duration-100 hover:opacity-100">
      <Button square small @click="openModal()" color="info"><Icon :size="20">visibility</Icon></Button>
      <slot name="actions" />
    </div>
    <div v-else @click="openModal()" class="absolute cursor-pointer flex h-full w-full flex-row items-center justify-center gap-2 rounded-xl bg-black/[12%] text-c-on-surface opacity-0 transition-opacity duration-100 hover:opacity-100">

    </div>
    <img v-if="props.thumbnail || props.url" class="h-full w-full rounded-xl bg-c-surface-container-high object-cover dark:bg-cd-surface-container-high" :src="props.thumbnail || props.url" />
    <div v-else class="h-full w-full flex items-center justify-center rounded-xl bg-c-surface-container-high dark:bg-cd-surface-container-high">
      <Icon size="36">visibility_off</Icon>
    </div>
  </div>
  <div v-else @click="openModal()">
    <slot name="trigger" />
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10" id="dialog">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-100 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-100 ease-in" leave-from="opacity-50 scale-100" leave-to="opacity-0 scale-95">
            <div class="fixed inset-0 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel>
                  <div class="relative max-w-5xl">
                    <button class="absolute top-4 right-4 text-c-on-surface dark:text-cd-on-surface" @click="closeModal()"><Icon>close</Icon></button>
                    <img class="h-full rounded-xl bg-c-surface-container-high object-scale-down dark:bg-cd-surface-container-high" :src="props.url" />
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
