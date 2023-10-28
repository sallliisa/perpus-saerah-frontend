<script setup lang="ts">
import ConfirmationModal from '../composites/ConfirmationModal.vue';
import Form from '../composites/Form.vue';

const modelValue = defineModel()
if (!modelValue.value) {
  modelValue.value = []
}

function removeModelValue(index: number) {
  console.log(modelValue.value)
  if (Array.isArray(modelValue.value))  modelValue.value.splice(index, 1)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center gap-4">
      <div class="font-bold">Jam Kerja</div>
      <Button @click="() => modelValue.push({})"><Icon>add</Icon></Button>
    </div>
    <div v-if="!modelValue?.length" class="text-muted">Tidak ada data</div>
    <div v-else v-for="(item, index) in modelValue" :key="modelValue.length" class="flex flex-row items-center gap-4">
      <Form
        class="w-full"
        static
        v-model="modelValue[index]"
        :inputConfig="{
          start_time: {
            type: 'time',
            span: 6,
            props: {
              required: true
            }
          },
          end_time: {
            type: 'time',
            span: 6,
            props: {
              required: true
            }
          }
        }"
        :fieldsAlias="{
          start_time: 'Waktu Mulai',
          end_time: 'Waktu Selesai'
        }"
      />
      <ConfirmationModal
        :onConfirm="(closeModal: Function) => {
          closeModal()
          removeModelValue(index)
        }"
      >
        <template #trigger>
          <Button square variant="icon"><Icon>delete_forever</Icon></Button>
        </template>
      </ConfirmationModal>
    </div>
  </div>
</template>