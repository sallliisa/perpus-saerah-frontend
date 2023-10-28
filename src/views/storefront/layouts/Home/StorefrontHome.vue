
<script setup lang="ts">
import SearchBox from '@/components/composites/SearchBox.vue';
import BookList from './layouts/BookList.vue';
import { ref } from 'vue';

const search = ref()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-8">
        <div class="text-4xl font-bold">Buku</div>
        <SearchBox v-model="search"/>
      </div>
      <Button variant="tonal" @click="() => $router.push({name: 'login'})">Login</Button>
    </div>
    <Suspense :key="search" :timeout="100">
      <template #fallback>
        <Spinner/>
      </template>
      <BookList :search="search"/>
    </Suspense>
  </div>
</template>