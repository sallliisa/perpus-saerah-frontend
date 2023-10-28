<script setup lang="ts">
import Tabs from '@/components/base/Tabs.vue';
import { softReload } from '@/stores/softreload';
import { defineAsyncComponent, provide, ref } from 'vue';

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

provide('book', props.book)

const tabConfig = [
  {name: 'Rating', component: defineAsyncComponent(() => import('./layouts/Ratings.vue'))},
  {name: 'Komentar', component: defineAsyncComponent(() => import('./layouts/Comments.vue'))},
]
const activeTabIndex = ref()
</script>

<template>
  <Tabs :config="tabConfig" v-model="activeTabIndex"/>
  <component v-if="activeTabIndex != null" :key="softReload().value['book-subdetail']" :is="tabConfig[activeTabIndex].component"/>
</template>