<script setup lang="ts">
import { Spinner, Toast } from '@/components/base/index'
import { ref } from 'vue'
import { saveProfile } from '@/utils/auth'
import { modules } from '@/stores/modules'
import { useRouter } from 'vue-router'
import { getLocalStorage } from '@/utils/browser'
import { Form } from '@/components/composites'
import {userConfig} from '@/stores/userconfig'
import app from '@/config'
import { immutableDefaults } from '@/app/actions/BaseCRUD'
import { toast } from '@/stores/toast'

const loginMessage = ref<{ message: string; type: 'error' | 'warning' | 'info' | 'success' | undefined }>({ message: '', type: undefined })
const router = useRouter()

const memberConfig = await userConfig().get('member')
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 sticky">
    <div class="text-3xl font-bold">Register</div>
    <div @click="() => $router.push({name: 'login'})" class="text-muted underline cursor-pointer">Kembali ke halaman login</div>
  </div>
  <div class="flex flex-col gap-4">
    <Form
      :fields="memberConfig.fieldAdd.slice(0, -1)"
      :inputConfig="{...immutableDefaults.inputConfig, ...memberConfig.inputConfig}"
      :fieldsAlias="{...immutableDefaults.fieldsAlias, ...memberConfig.fieldsAlias}"
      targetAPI="member"
      :onSuccess="async (payload, res) => {
        toast().setSuccess('Berhasil mendaftarkan akun! Silahkan login untuk masuk ke aplikasi')
        $router.push({name: 'login'})
      }"
    >
      <template #submitButton="{loading}">
        <Button :disabled="loading" type="submit" class="mt-6 w-full">
          <div v-if="!loading">Daftar</div>
          <Spinner v-else />
        </Button>
      </template>
    </Form>
  </div>
  <div class="flex w-full items-center justify-center">
    <Toast v-if="loginMessage.message" :type="loginMessage.type">{{ loginMessage.message }}</Toast>
  </div>
</template>