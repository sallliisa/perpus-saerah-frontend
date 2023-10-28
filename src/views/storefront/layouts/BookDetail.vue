<script setup lang="ts">
import services from '@/utils/services';
import { useRoute } from 'vue-router';


const route = useRoute()

const data = await services.single('book', route.query.book_id)
</script>

<template>
</template>