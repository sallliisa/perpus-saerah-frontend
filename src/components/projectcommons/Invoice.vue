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
<div class="flex flex-col gap-4 max-w-full min-w-[650px] overflow-hidden w-full bg-white p-4 rounded-xl text-c-on-surface">
  <div class="flex flex-row items-center gap-4 w-full">
    <div class="w-16 bg-c-primary h-full p-4">&nbsp</div>
    <div class="p-4 flex flex-row items-center gap-4">
      <Logo color="color" strict/>
      <Wordmark color="color" strict/>
    </div>
    <div class="w-full bg-c-primary min-h-full p-4 flex items-center justify-end font-bold text-c-on-primary">{{ invoice_number }}</div>
  </div>
  <div class="font-bold">{{ $parse('date', new Date().toJSON(), 'parser') }}</div>
  <div class="flex flex-col gap-4 p-4 rounded-xl bg-c-surface-container">
    <div class="text-c-on-surface/[38%] font-bold">Rincian Pengirim</div>
    <table>
      <thead>
        <tr>
          <th class="text-start">Oleh</th>
          <th class="text-start">Alamat</th>
          <th class="text-start">Telepon</th>
          <th class="text-start">Email</th>
        </tr>
        <tr>
          <td class="text-start">{{ sender.name }}</td>
          <td class="text-start">{{ sender.address }}</td>
          <td class="text-start">{{ sender.phone }}</td>
          <td class="text-start">{{ sender.email }}</td>
        </tr>
      </thead>
    </table>
  </div>
  <hr/>
  <div class="flex flex-col gap-2">
    <div class="text-c-on-surface/[38%] font-bold">Penerima</div>
    <div class="flex flex-col">
      <div class="font-bold">{{ recepient.partner_name }}</div>
      <div>{{ recepient.partner_phone }}</div>
      <div>{{ recepient.office_name }}</div>
      <div>{{ recepient.office_address }}</div>
    </div>
  </div>
  <table>
    <thead>
      <th class="text-start bg-c-surface-container p-4">No</th>
      <th class="text-start bg-c-surface-container p-4">Uraian</th>
      <th class="text-start bg-c-surface-container p-4">Harga Satuan</th>
      <th class="text-start bg-c-surface-container p-4">Total</th>
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
    </table>
    <div class="flex flex-col gap-4 p-4 rounded-xl bg-c-surface-container">
      <table>
        <tr>
          <td class="w-[1%] whitespace-nowrap">Total Diterima</td>
          <td class="w-[1%] px-8">:</td>
          <td>{{$parse('currency', order_invoice.total_amount, 'parser')}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>