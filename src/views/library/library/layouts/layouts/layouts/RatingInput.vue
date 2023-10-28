<script setup lang="ts">
import Form from '@/components/composites/Form.vue';
import { softReload } from '@/stores/softreload';
import { toast } from '@/stores/toast';
import services from '@/utils/services';
import { inject, ref } from 'vue';

const book = inject('book', ({} as any))

const formData = ref({})
</script>

<template>
  <Card>
    <div>Suka dengan {{ book.name }}? Nilai buku ini!</div>
    <Form
      :inputConfig="{
        rating_score: {
          type: 'custom',
          componentName: 'StarsInput'
        }
      }"
      static
      v-model="formData"
    ></Form>
    <Button
      class="max-w-fit"
      @click="async () => {
        services.create('bookRating', {...formData, book_id: book.id, member_id: 1}).then(res => {
          toast().setSuccess('Berhasil menambahkan review!')
          softReload().triggerChange('book')
        })
      }"
    >Submit</Button>
  </Card>
</template>