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
import type { StringObject } from '@/types'

const loginMessage = ref<{ message: string; type: 'error' | 'warning' | 'info' | 'success' | undefined }>({ message: '', type: undefined })
const router = useRouter()

function onLoginSuccess(res: Record<string, any>) {
  console.log(res)
  if (res.data.token) saveProfile(res.data)
  if (modules().value.length == 0) modules().buildModules()
  if (res.data.permissions.length == 0 && app.mode == 'PRODUCTION') {
    loginMessage.value = { message: 'Anda tidak memiliki akses ke aplikasi ini', type: 'error' }
    return
  }
  userConfig().getPrefetchConfig()
  router.push({ name: getLocalStorage('modules')[0].routes.find((x: any) => !x.separator).name })
  router.go(1)
}

const loginForm = {
  inputConfig: {
    email: { type: 'text', props: {required: true} },
    password: { type: 'password', props: {required: true} },
  },
  fieldsAlias: {
    email: 'Email',
    password: 'Password',
  },
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="text-3xl font-bold">Login</div>
  </div>
  <div class="flex flex-col gap-4">
    <Form
      v-bind="loginForm"
      submitOnEnter
      :targetAPI="'/login?custom'"
      :postAdditionalData="{access_user: 'tulen_admins', mobile: 0}"
      :onSuccess="onLoginSuccess"
    >
      <template #submitButton="{loading}">
        <Button :disabled="loading" type="submit" class="mt-6 w-full">
          <div v-if="!loading">Login</div>
          <Spinner v-else />
        </Button>
      </template>
    </Form>
    <div class="flex items-center justify-center">
      <div @click="() => $router.push({name: 'register'})" class="text-muted underline cursor-pointer">Belum punya akun?</div>
    </div>
  </div>
  <div class="flex w-full items-center justify-center">
    <Toast v-if="loginMessage.message" :type="loginMessage.type">{{ loginMessage.message }}</Toast>
  </div>
</template>