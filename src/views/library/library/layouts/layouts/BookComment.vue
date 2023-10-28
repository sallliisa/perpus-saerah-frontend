<script setup lang="ts">
import { Form } from '@/components/composites';
import { softReload } from '@/stores/softreload';
import { toast } from '@/stores/toast';
import { hasPermission } from '@/utils/auth';
import services from '@/utils/services';
import { inject } from 'vue';

const book = inject('book', ({} as any))

const data = await services.list('bookComment', {book_id: book.id})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Card v-if="hasPermission('create-book-comment')">
      <Form
        :inputConfig="{
          content: {
            type: 'textarea',
          }
        }"
        targetAPI="bookComment"
        :fieldsAlias="{
          content: 'Komentar'
        }"
        :postAdditionalData="{book_id: book.id, member_id: 1}"
        :onSuccess="() => {
          toast().setSuccess('Berhasil menambahkan komentar!')
          softReload().triggerChange('book-subdetail')
        }"
      ></Form>
    </Card>
    <div v-if="data?.length" class="grid grid-dynamic-[200px] gap-4">
      <Card v-for="comment in data" class="gap-2">
        <div class="flex flex-col">
          <div>{{ comment.member_user_name }}</div>
          <div class="text-sm text-muted">{{ $parse('datetime', comment.created_at, 'parser') }}</div>
        </div>
        <div class="italic">"{{ comment.content }}"</div>
      </Card>
    </div>
    <div class="text-muted" v-else>Belum ada komentar untuk buku ini</div>
  </div>
</template>