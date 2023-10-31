<script setup lang="ts">
import BaseCRUD from '@/components/composites/BaseCRUD.vue'
import ConfirmationModal from '@/components/composites/ConfirmationModal.vue';
import { softReload } from '@/stores/softreload';
import { toast } from '@/stores/toast';
import type { BaseCRUDConfig } from '@/types'
import services from '@/utils/services';

const props = defineProps({
  configOverride: {
    type: Object,
    required: false,
  },
})

const config: Partial<BaseCRUDConfig> = {}
</script>

<template>
  <div>
    <main>
      <BaseCRUD main :key="softReload().value['member']" :config="config" :configOverride="props.configOverride">
        <template #l-verified="{data}">
          <Chip :color="($parse('verified_code_color', data.verified) as any)">{{ $parse('verified_code', data.verified) }}</Chip>
        </template>
        <template #s-verified="{data}">
          <div class="flex flex-row items-center gap-4">
            <Chip :color="($parse('verified_code_color', data.verified) as any)">{{ $parse('verified_code', data.verified) }}</Chip>
            <ConfirmationModal
              v-if="data.verified === 2"
              title="Verifikasi member perpustakaan"
              message="Aksi ini hanya bisa dilakukan sekali dan tidak dapat diulang lagi."
              :actions="['y', 'n']"
              :onConfirm="async (closeModal: Function) => {
                services.post('member/verify', {id: data.id, verification_code: 1}).then(res => {
                  toast().setSuccess('Berhasil memverifikasi member!')
                  softReload().triggerChange('member')
                  closeModal()
                })
              }"
              :onCancel="async () => {
                services.post('member/verify', {id: data.id, verification_code: 0}).then(res => {
                  toast().setSuccess('Berhasil menolak verifikasi member!')
                  softReload().triggerChange('member')
                })
              }"
            >
              <template #trigger>
                <Button variant="tonal">Verifikasi <Icon>check</Icon></Button>
              </template>
              <template #b-y>
                <Button color="success">Verifikasi</Button>
              </template>
              <template #b-n>
                <Button color="error">Tolak</Button>
              </template>
            </ConfirmationModal>
          </div>
        </template>
      </BaseCRUD>
    </main>
  </div>
</template>

