<script setup lang="ts">
import ImagePreview from '@/components/base/ImagePreview.vue';
import services from '@/utils/services';

const props = defineProps({
  search: {
    type: String,
    required: false
  }
})

const data = await services.list('book', {search: props.search, limit: 99999})
</script>

<template>
  <div v-if="data?.length" class="grid grid-dynamic-[300px]">
    <Card v-for="book in data" class="max-w-sm" interactive @click="() => $router.push({query: {view: 'show',  book_id: book.id}})">
      <ImagePreview :url="book.img_photo.preview" class="aspect-square h-[300px]"/>
      <div class="flex flex-col">
        <div class="text-xl font-bold">{{ book.name }}</div>
        <div class="text-muted">{{ book.category_name }}</div>
        <div class="text-muted">{{ book.author }} - {{ book.publisher }}</div>
      </div>
    </Card>
  </div>
  <div v-else class="text-muted">Tidak ada buku yang ditemukan</div>
</template>