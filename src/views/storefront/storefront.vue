<script setup lang="ts">
import StorefrontHome from './layouts/Home/StorefrontHome.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BookDetail from './layouts/BookDetail.vue';


const route = useRoute()
const view = computed(() => route.query.view)
</script>

<template>
  <StorefrontHome v-if="!view"></StorefrontHome>
  <BookDetail v-else-if="view == 'show'"></BookDetail>
</template>