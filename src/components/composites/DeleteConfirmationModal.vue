<script setup lang="ts">
const props = defineProps({
  deleteAction: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: 'Hapus data permanen',
  },
  description: {
    type: String,
    required: false,
    default: 'Data yang sudah dihapus tidak dapat dikembalikan. Hapus?',
  },
})
console.log('remounted deleteconfirmationmodal')
</script>

<template>
  <Modal>
    <template #trigger>
      <Button v-if="!$slots.trigger" variant="tonal" color="error" square>
        <Icon>delete_forever</Icon>
      </Button>
      <slot v-else name="trigger"></slot>
    </template>
    <template #title> {{ props.title }} </template>
    <template #content>
      <p>{{ props.description }}</p>
    </template>
    <template #footer="{ closeModal }">
      <div class="flex flex-row gap-2">
        <Button variant="tonal" @click=";[props.deleteAction(), closeModal()]" class="flex flex-row gap-2">
          <Icon>delete_forever</Icon>
          Hapus
        </Button>
        <Button @click="closeModal()"> Batal </Button>
      </div>
    </template>
  </Modal>
</template>
