<script setup lang="ts">
import Logo from '@/assets/corporate/common/Logo.vue'
import Wordmark from '@/assets/corporate/common/Wordmark.vue'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex h-[1241px] w-[877px] flex-col justify-between">
    <div class="flex w-full flex-col gap-8">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-4">
          <div class="flex flex-col items-center gap-2">
            <Logo color="color" />
            <Wordmark color="color" class="w-24" />
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-xl font-bold">PT Adhi Karya (Persero) Tbk.</div>
            <div class="text-c-secondary">Beyond Construction</div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-4xl font-bold">INVOICE</div>
          <Chip>UNPAID</Chip>
        </div>
      </div>
      <hr />
      <div class="flex w-full flex-col items-end justify-end">
        <div class="text-xl font-bold">Invoice No. #02-235974</div>
        <div class="text-sm">Tanggal: {{ $parse('date', String(new Date()), 'parser') }}</div>
      </div>
      <div class="grid grid-cols-2 divide-x-2">
        <div class="flex flex-col gap-1">
          <div>Kepada Yth</div>
          <div class="text-xl font-bold">PT. Maju Jaya Sejahtera</div>
          <div class="Dsn. Krajan Kulon RT.002 RW.013 Ds. Wonosobo text-sm"></div>
          <div class="text-muted font-bold">Bapak Suratman</div>
          <div class="text-muted">085161418260</div>
        </div>
        <div class="flex flex-row items-center justify-between gap-8 pl-8">
          <div class="flex h-full flex-col items-end justify-between">
            <div class="flex flex-col gap-1">
              <div class="text-sm">Due date</div>
              <div class="font-bold text-c-secondary">{{ $parse('date', String(new Date()), 'parser') }}</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-sm">Invoice No.</div>
              <div>#02-235974</div>
            </div>
          </div>
          <Card color="primary" class="flex h-full">
            <div class="flex h-full flex-row items-center">
              <div class="flex flex-col">
                <div class="text-sm">Total due</div>
                <div class="text-xl font-bold text-c-secondary">{{ $parse('currency', '156825000000000', 'parser') }}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div class="flex flex-col">
        <table>
          <thead>
            <tr class="h-[50px] bg-c-surface-container">
              <th class="px-2 text-start">No</th>
              <th class="px-2 text-start">Nama Produk</th>
              <th class="px-2 text-start">Qty</th>
              <th class="px-2 text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in props.config.data" class="h-[50px]">
              <td v-for="key in props.config.fields" class="px-2">{{ item[key] }}</td>
            </tr>
            <tr class="h-[50px] bg-c-surface-container">
              <td class="px-2"></td>
              <td class="px-2"></td>
              <td class="px-2">Sub Total</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
            <tr class="h-[50px] bg-c-surface-container">
              <td class="px-2"></td>
              <td class="px-2"></td>
              <td class="px-2">PPN 11%</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
            <tr class="h-[50px] bg-c-surface-container">
              <td class="px-2"></td>
              <td class="px-2"></td>
              <td class="px-2">Discount</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
            <tr class="h-[50px] bg-c-surface-container-highest">
              <td class="px-2"></td>
              <td class="px-2">Additional Cost</td>
              <td class="px-2">Asuransi</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
            <tr class="h-[50px] bg-c-surface-container-highest">
              <td class="px-2"></td>
              <td class="px-2"></td>
              <td class="px-2">Ongkir</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
            <tr class="h-[50px] bg-c-primary text-c-on-primary">
              <td class="px-2"></td>
              <td class="px-2"></td>
              <td class="px-2">Grand Total</td>
              <td class="px-2">{{ $parse('currency', '1231241', 'parser') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col gap-16">
      <div class="flex flex-col">
        <div class="text-muted">Informasi Pembayaran</div>
        <div>Bank Mandiri</div>
        <div>No. Rekening <span class="font-bold">1360031781500</span></div>
        <div>PT. Adhi Karya (Persero) Tbk.</div>
      </div>
      <div class="flex flex-col gap-1">
        <hr />
        <div class="text-muted text-sm">Invoice dicetak oleh PT. Adhi Karya (Persero) Tbk. | {{ $parse('date', String(new Date()), 'parser') }}, 13:00 WIB</div>
      </div>
    </div>
  </div>
</template>
