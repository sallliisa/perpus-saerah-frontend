<script setup lang="ts">
import ImagePreview from '@/components/base/ImagePreview.vue';
import Tabs from '@/components/base/Tabs.vue';
import Detail from '@/components/composites/Detail.vue';
import services from '@/utils/services';
import { defineAsyncComponent, provide, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const {data} = await services.single('book', route.query.library_id)

provide('book', data)

const activeTabIndex = ref()
const tabConfig = [
  {name: 'Rating', component: defineAsyncComponent(() => import('./layouts/BookRating.vue'))},
  {name: 'Komentar', component: defineAsyncComponent(() => import('./layouts/BookComment.vue'))},
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-12 gap-8">
      <Card class="col-span-3 p-0">
        <ImagePreview :url="data.img_photo.preview" class="h-[500px]"/>
      </Card>
      <div class="col-span-9 flex flex-col gap-16">
        <div class="flex flex-col gap-1">
          <div class="text-4xl font-bold">{{ data.name }}</div>
          <div>{{ data.category_name }} - {{ data.author }}</div>
        </div>
        <Detail
          :fields="['publisher', 'publishing_city', 'editor', 'stock']"
          :data="data"
          :fieldsAlias="{
            publisher: 'Penerbit',
            publishing_city: 'Kota Penerbit',
            editor: 'Editor',
            stock: 'Stok'
          }"
        />
      </div>
    </div>
    <Tabs :config="tabConfig" v-model="activeTabIndex"/>
    <Suspense :timeout="0">
      <template #fallback>
        <Spinner/>
      </template>
      <component v-if="activeTabIndex != null" :is="tabConfig[activeTabIndex].component"/>
    </Suspense>
  </div>
</template>