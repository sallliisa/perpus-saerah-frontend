<script setup lang="ts">
import Logo from '@/assets/corporate/common/Logo.vue'
import Wordmark from '@/assets/corporate/common/Wordmark.vue'
import loginBackground from '@/assets/corporate/assets/login-background.svg'
import {useRouter} from 'vue-router'
import { getLocalStorage } from '@/utils/browser'

const router = useRouter()
if (localStorage.getItem('_token')) {
  router.push({ name: getLocalStorage('modules')[0].routes.find((x: any) => !x.separator).name })
}
</script>

<template>
  <div class="grid grid-cols-12 h-full min-h-screen w-full text-cd-on-surface" :style="{ background: `url(${loginBackground})` }">
    <div class="col-span-12 md:col-span-6 flex items-center justify-center px-8 py-16">
      <div class="flex flex-col gap-8 max-w-xl">
        <div class="flex flex-row items-center gap-2">
          <Logo color="white" strict/>
          <Wordmark color="white" strict/>
        </div>
        <div class="text-lg">Platform Penyedia Jasa Tukang dan Produk Material bergaransi, didukung penuh oleh PT Adhi Karya (Persero) Tbk, Perusahaan Publik terbesar dalam bidang jasa konstruksi</div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 flex items-center justify-center">
      <Card class="py-16 px-24 rounded-b-none">
        <slot></slot>
      </Card>
    </div>
  </div>
</template>