<script setup lang="ts">
import Logo from '@/assets/corporate/common/Logo.vue';
import Wordmark from '@/assets/corporate/common/Wordmark.vue';
import type { PropType } from 'vue';

const props = defineProps({
  invoice_number: {
    type: String,
    required: true
  },
  sender: {
    type: Object,
    required: true
  },
  recepient: {
    type: Object,
    required: true
  },
  order_invoice_detail: {
    type: Array as PropType<Array<Record<string, any>>>,
    required: true
  },
  order_invoice: {
    type: Object,
    required: true
  }
})
</script>

<template>
<div class="flex flex-col gap-4 max-w-5xl w-full">
  <div class="flex flex-row items-center gap-4 w-full">
    <div class="w-16 bg-c-primary h-full p-4">&nbsp</div>
    <div class="p-4 flex flex-row items-center gap-4">
      <Logo color="color" strict/>
      <Wordmark color="color" strict/>
    </div>
    <div class="w-full bg-c-primary min-h-full p-4 flex items-center justify-end font-bold text-c-on-primary">{{ invoice_number }}</div>
  </div>
  <div class="font-bold">{{ $parse('date', new Date().toJSON(), 'parser') }}</div>
  <Card>
    <div class="text-muted font-bold">Rincian Pengirim</div>
    <table>
      <thead>
        <tr>
          <th class="text-start" v-for="field in ['Oleh', 'Alamat', 'Telepon', 'Email']">{{ field }}</th>
        </tr>
        <tr>
          <td class="text-start" v-for="field in [sender.name, sender.address, sender.phone, sender.email]">{{ field }}</td>
        </tr>
      </thead>
    </table>
  </Card>
  <hr/>
  <div class="flex flex-col gap-2">
    <div class="text-muted font-bold">Penerima</div>
    <div class="flex flex-col">
      <div class="font-bold">{{ recepient[Object.keys(recepient)[0]] }}</div>
      <div v-for="field in Object.keys(recepient).splice(1)">{{ recepient[field] }}</div>
    </div>
  </div>
  <table>
    <thead>
      <th v-for="item in ['No', 'Uraian', 'Harga Satuan', 'Total']" class="text-start bg-c-surface-container p-4">{{ item }}</th>
    </thead>
    <td class="bg-c-surface-container"></td>
    <tr v-for="(item, index) in order_invoice_detail">
      <td class="p-4">{{ index+1 }}.</td>
      <td class="flex flex-col p-4">
        <div>{{ item.service_name }}</div>
        <div class="font-bold">{{ item.quantity }} Unit</div>
      </td>
      <td>{{ $parse('currency', item.unit_price, 'parser') }}</td>
      <td>{{ $parse('currency', item.total_price, 'parser') }}</td>
    </tr>
  </table>
  <div class="flex flex-row items-center justify-between">
    <table>
      <!-- <tr v-for="item in [
        {name: 'Kode Bank', data: '00000'},
        {name: 'No Rekening', data: '00000000'},
      ]">
        <td class="w-[1%] whitespace-nowrap">{{ item.name }}</td>
        <td class="w-[1%] px-2">:</td>
        <td>{{ item.data }}</td>
      </tr> -->
    </table>
    <Card>
      <table>
        <tr v-for="item in [
          // {name: 'Sub Total', data: $parse('currency', order_invoice.total_amount, 'parser')},
          // {name: 'Pajak PPN (10%)', data: $parse('currency', '00000000', 'parser')},
          {name: 'Total Diterima', data: $parse('currency', order_invoice.total_amount, 'parser')},
        ]">
          <td class="w-[1%] whitespace-nowrap">{{ item.name }}</td>
          <td class="w-[1%] px-8">:</td>
          <td>{{ item.data }}</td>
        </tr>
      </table>
    </Card>
  </div>
</div>
</template>