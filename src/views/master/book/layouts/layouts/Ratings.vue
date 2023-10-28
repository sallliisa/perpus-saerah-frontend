<script setup lang="ts">
import Stars from '@/components/base/Stars.vue';
import { Form } from '@/components/composites';
import services from '@/utils/services';
import { inject } from 'vue';
import RatingInput from './layouts/RatingInput.vue'

const book = inject('book', ({} as any))

const data = await services.list('bookRating', {book_id: book.id})
</script>

<template>
  <div class="flex flex-col gap-4">
    <RatingInput v-if="!book.hasRated"/>
    <div class="grid grid-dynamic-[200px] gap-4">
      <Card v-for="rating in data" class="gap-2">
        <div class="flex flex-col">
          <div>{{ rating.member_user_name }}</div>
          <div class="text-muted text-sm">{{ $parse('datetime', rating.created_at, 'parser') }}</div>
        </div>
        <Stars :value="rating.rating_score"/>
      </Card>
    </div>
  </div>
</template>