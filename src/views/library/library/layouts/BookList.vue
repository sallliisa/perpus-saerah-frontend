<script setup lang="ts">
import ImagePreview from '@/components/base/ImagePreview.vue';
import services from '@/utils/services';

const props = defineProps({
  search: {
    type: String
  }
})

const data = await services.list('book', {search: props.search, limit: 1000000})
</script>

<template>
  <div class="grid grid-dynamic-[300px] gap-4">
    <Card v-for="book in data" class="max-w-sm p-0 gap-0" interactive @click="() => $router.push({query: {library_view: 'show', library_id: book.id}})">
      <ImagePreview :url="book.img_photo.preview" class="aspect-square h-[300px]"/>
      <div class="p-4 flex flex-col gap-1">
        <div class="text-xl font-bold">{{ book.name }}</div>
        <div class="text-muted">{{ book.category_name }} - {{ book.author }}</div>
      </div>
    </Card>
  </div>
</template>