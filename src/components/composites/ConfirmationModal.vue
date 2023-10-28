<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Apakah anda yakin ingin melakukan aksi ini?"
  },
  message: {
    type: String,
    required: false,
    default: "Tekan lanjut untuk melanjutkan aksi"
  },
  actions: {
    type: Array as PropType<Array<'y' | 'n'>>,
    required: false,
    default: () => ['y', 'n']
  },
  confirmationButtonAppearance: {
    type: Object,
    required: false,
    default: () => ({
      y: {
        label: "Lanjut",
        props: {
          color: "primary",
          variant: "icon"
        }
      },
      n: {
        label: "Batal",
        props: {
          color: "error",
          variant: "filled"
        }
      }
    })
  },
  onConfirm: {
    type: Function,
    required: false,
    default: () => {}
  },
  onCancel: {
    type: Function,
    required: false,
    default: () => {}
  }
})

const actionMap = {
  y: props.onConfirm,
  n: props.onCancel
}
</script>

<template>
  <Modal :class="($attrs.class as string)">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #title>
      {{ title }}
    </template>
    <template #content="{closeModal}">
      <div class="flex flex-col gap-4">
        <div>{{ message }}</div>
        <div class="flex flex-row w-full items-center gap-4 justify-end">
          <Button
            v-for="action in actions"
            v-bind="confirmationButtonAppearance[action].props"
            @click="action === 'n' ? [closeModal(), actionMap[action](closeModal)] : actionMap[action](closeModal)"
          >
            {{ confirmationButtonAppearance[action].label }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>