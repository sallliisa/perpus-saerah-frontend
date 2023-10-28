<script setup lang="ts">
import services from '@/utils/services';
import FileInput from '../inputs/FileInput.vue';
import { ref } from 'vue';

const modelValue = defineModel()
if (!modelValue.value) modelValue.value = []

const loading = ref(true)
const documentCategories = ref()
services.list('document-categories').then(res => {
  documentCategories.value = res.data
  modelValue.value = res.data.map((item: any) => ({...item, document_category_id: item.id, file_attachment: null}))
  loading.value = false
})

</script>

<template>
  <div v-if="loading" class="flex w-full items-center justify-center"><Spinner/></div>
  <div v-else class="flex flex-col gap-8 mb-8">
    <FileInput
      v-for="(category, index) in documentCategories"
      v-model="modelValue[index].file_attachment"
      :label="category.name"
      :helperMessage="category.description"
    /> 
  </div>
</template>