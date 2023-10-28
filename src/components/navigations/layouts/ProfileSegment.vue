<script setup lang="ts">
import services from '@/utils/services'
import { setLocalStorage } from '@/utils/browser'
import { Switch } from '@/components/inputs/index'
import { useColorPreference } from '@/stores/colorpreference'
import { toast } from '@/stores/toast'
import { modules } from '@/stores/modules'
import { useDataModel } from '@/stores/datamodel'
import { userConfig } from '@/stores/userconfig'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import ModalForm from '@/components/composites/ModalForm.vue'

const router = useRouter()
const loading = ref(true)
const profileData = ref(JSON.parse(localStorage.getItem('profile') || '{}'))

const refreshProfile = async () => {
  return await services
    .get('me')
    .then((res) => {
      if (res.user) localStorage.setItem('profile', JSON.stringify(res.user))
      if (res.tasks) setLocalStorage('permission', res.tasks)
    })
    .catch((err) => {
      toast().setError('Terdapat kesalahan')
    })
}

const refreshApp = async () => {
  await refreshProfile()
  modules().rebuildModules()
  useDataModel().resetDataModel()
  await userConfig().getPrefetchConfig()
  router.go(0)
}

// const resetPasswordForm = ref({password: '', confirmPassword: '', oldPassword: ''})

// const error = computed(() => {
//   if (resetPasswordForm.value.password != resetPasswordForm.value.confirmPassword) return 'Password baru harus sama!'
//   else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(resetPasswordForm.value.password)) return 'Password harus terdiri dari 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter spesial'
//   else return null
// })

// function resetPassword(closeModal: Function) {
//   loading.value = true
//   services.post('/change-password', {new_password: resetPasswordForm.value.password, new_password_confirmation: resetPasswordForm.value.password, old_password: resetPasswordForm.value.oldPassword, }).then(res => {
//     closeModal()
//     toast().setSuccess('Berhasil melakukan reset password!')
//     loading.value = false
//   }).catch(err => {
//     console.error(err)
//     toast().setError(err.data.message)
//     loading.value = false
//   })
// }

function saveUserProfile() {
  loading.value = true
  services
    .update('profile', profileData.value)
    .then((res) => {
      toast().setSuccess('Profil berhasil diperbarui')
      loading.value = false
    })
    .catch((err) => {
      toast().setError('Profil gagal diperbarui')
      loading.value = false
    })
}

const resetPasswordForm = {
  inputConfig: {
    old_password: {
      type: "password",
      props: {
        required: true
      }
    },
    new_password: {
      type: "password",
      props: {
        required: true
      }
    },
    confirm_new_password: {
      type: "password",
      props: {
        required: true
      }
    }
  },
  fieldsAlias: {
    old_password: "Password Lama",
    new_password: "Password Baru",
    confirm_new_password: "Konfirmasi Password Baru"
  }
}
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <div class="flex flex-col gap-8">
      <Card color="surface-high" class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center gap-4">
          <img v-if="profileData.img_photo_user" :src="profileData.img_photo_user.url" class="h-[64px] w-[64px] rounded-full object-cover" />
          <div v-else class="min-h-[64px] min-w-[64px] rounded-full bg-gray-500"></div>
          <div class="flex flex-col">
            <div class="font-bold">{{ profileData.fullname }}</div>
            <div class="text-c-black-light text-sm">{{ profileData.role_name }}</div>
          </div>
        </div>
        <!-- <div class="mt-2"><Icon>chevron_right</Icon></div> -->
      </Card>
      <!-- <Modal>
        <template #trigger>
        <Card color="surface-high" class="flex flex-row items-center justify-between" interactive>
          <div class="flex flex-row items-center gap-4">
            <img v-if="profileData.img_photo_user" :src="profileData.img_photo_user.url" class="h-[64px] w-[64px] rounded-full object-cover" />
            <div v-else class="min-h-[64px] min-w-[64px] rounded-full bg-gray-500"></div>
            <div class="flex flex-col">
              <div class="font-bold">{{ profileData.fullname }}</div>
              <div class="text-c-black-light text-sm">{{ profileData.role_name }}</div>
            </div>
          </div>
          <div class="mt-2"><Icon>chevron_right</Icon></div>
          <Button color="error" variant="icon" @click="services.signOut()"><ArrowLeftOnRectangleIcon class="h-5 w-5" /></Button>
        </Card>
      </template>
      <template #content>
        <div v-if="profileData" id="user-profile-segment" class="flex flex-col gap-8">
          <div class="flex flex-row gap-4">
            <ImageInput disableInformation disableHelperMessage v-model="profileData.img_photo_user" class="aspect-square rounded-full" />
            <div class="flex w-full flex-col justify-between">
              <Input v-model="profileData.username" class="w-full" label="Username" id="username" disabled />
            </div>
          </div>
          <div class="flex gap-8 items-center w-full justify-end">
            <Modal>
              <template #trigger>
                <div class="text-c-primary dark:text-cd-primary cursor-pointer">Ubah password</div>
              </template>
              <template #title>
                <div class="text-xl font-bold">Ubah password</div>
              </template>
              <template #content="{closeModal}">
                <div class="flex flex-col gap-4">
                  <div class="text-muted">Setelah password berhasil diubah, anda akan diarahkan kembali ke halaman login untuk login kembali dengan kredensial anda yang baru.</div>
                  <PasswordInput label="Password lama" v-model="resetPasswordForm.oldPassword"/>
                  <PasswordInput label="Password baru" v-model="resetPasswordForm.password"/>
                  <PasswordInput label="Ulangi password baru" v-model="resetPasswordForm.confirmPassword"/>
                  <div class="flex mt-8 flex-row w-full items-center gap-4 justify-end">
                    <div v-if="error">{{ error }}</div>
                    <Button class="max-w-fit" @click="resetPassword(closeModal)" :disabled="!!error || loading || !resetPasswordForm.password.length || !resetPasswordForm.oldPassword.length">Ubah password</Button>
                  </div>
                </div>
              </template>
            </Modal>
            <Button @click="saveUserProfile()">Simpan</Button>
          </div>
        </div>
      </template>
      </Modal> -->
      <div class="flex flex-col gap-4">
        <div class="flex w-full flex-row items-center justify-between">
          <div>Mode Gelap</div>
          <Switch :modelValue="useColorPreference().value == 'dark'" :onActive="() => useColorPreference().switchTo('dark')" :onDeactive="() => useColorPreference().switchTo('light')"></Switch>
        </div>
        <!-- <ModalForm
          v-bind="resetPasswordForm"
          class="w-full"
          targetAPI="password/change?custom"
        >
          <template #trigger>
            <Button color="tertiary" class="w-full">Ubah Password</Button>
          </template>
        </ModalForm> -->
        <div class="flex flex-row items-center gap-2">
          <Button @click="refreshApp()" class="w-full"><Icon>refresh</Icon>Muat ulang</Button>
          <Button @click="services.signOut()" variant="tonal" color="error"><Icon>logout</Icon></Button>
        </div>
      </div>
    </div>
  </div>
</template>
