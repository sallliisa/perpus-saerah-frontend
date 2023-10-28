<script setup lang="ts">
import { softReload } from '@/stores/softreload';
import ModalForm from '../composites/ModalForm.vue';
import Table from '../composites/Table.vue';
import ConfirmationModal from '../composites/ConfirmationModal.vue';
import FileComponent from '../base/FileComponent.vue';

const modelValue = defineModel()
if (!modelValue?.value) modelValue.value = []
</script>

<template>
<div class="flex flex-col gap-4 mb-8">
  <div class="flex flex-row items-center justify-between gap-4">
    <div class="text-xl">Daftar Sertifikat Keahlian</div>
    <ModalForm
      :inputConfig="{
        name: {
          type: 'text',
          props: {
            required: true
          }
        },
        file_attachment: {
          type: 'file',
          props: {
            required: true
          }
        }
      }"
      :onSubmit="async (data) => {
        await modelValue.push(data)
        console.log(modelValue)
        softReload().triggerChange('child_data_worker_certifications_table')
      }"
      :fieldsAlias="{
        name: 'Nama Sertifikat',
        file_attachment: 'File'
      }"
    >
      <template #trigger>
        <Button><Icon>add</Icon>Tambah</Button>
      </template>
    </ModalForm>
  </div>
  <Table
    :key="softReload().value['child_data_worker_certifications_table']"
    :fields="['name', 'file_attachment']"
    :data="modelValue"
    :fieldsAlias="{
      name: 'Nama Sertifikat',
      file_attachment: 'File'
    }"
  >
    <template #l-tableActions="{index}">
      <ConfirmationModal
        :onConfirm="(closeModal: () => void) => {
          closeModal()
          modelValue.splice(index, 1)
        }"
      >
        <template #trigger>
          <Button square color="error" variant="tonal"><Icon>delete_forever</Icon></Button>
        </template>
      </ConfirmationModal>
    </template>
    <template #l-file_attachment="{data}">
      <FileComponent :filename="data.file_attachment.file" :url="data.file_attachment.preview" :ext="data.file_attachment.file.split('.').slice(-1)"/>
    </template>
  </Table>
</div>  
</template>