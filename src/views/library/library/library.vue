<script setup lang="ts">
import SearchBox from '@/components/composites/SearchBox.vue';
import BookList from './layouts/BookList.vue'
import BookDetail from './layouts/BookDetail.vue'
import { ref } from 'vue';

const search = ref()
</script>

<template>
  <main class="flex flex-col gap-16">
    <div class="flex flex-row items-center justify-between">
      <div v-if="!$route.query['library_view']" class="flex flex-row items-center gap-4">
        <div class="text-4xl font-bold">Perpustakaan</div>
        <SearchBox v-model="search"/>
      </div>
      <div v-else class="h-[42px] flex items center justify-center">
        <Button square variant="icon" @click="() => $router.go(-1)"><Icon>chevron_left</Icon></Button>
      </div>
    </div>
    <Suspense :timeout="100">
      <template #fallback>
        <Spinner/>
      </template>
      <Transition name="route" mode="out-in">
        <BookList v-if="!$route.query['library_view']" :key="search" :search="search"/>
        <BookDetail v-else-if="$route.query['library_view'] == 'show'"/>
      </Transition>
    </Suspense>
  </main>
</template>

<style>
.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s ease;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>