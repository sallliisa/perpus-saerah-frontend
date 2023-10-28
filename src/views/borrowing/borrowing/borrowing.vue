<script setup lang="ts">
import Tabs from '@/components/base/Tabs.vue';
import BaseCRUD from '@/components/composites/BaseCRUD.vue'
import ConfirmationModal from '@/components/composites/ConfirmationModal.vue';
import { softReload } from '@/stores/softreload';
import { toast } from '@/stores/toast';
import type { BaseCRUDConfig } from '@/types'
import services from '@/utils/services';
import { ref } from 'vue';

const props = defineProps({
  configOverride: {
    type: Object,
    required: false,
  },
})

const config: Partial<BaseCRUDConfig> = {}

const tabConfig = [
  {name: "Semua", filter: undefined},
  {name: "Sedang Dipinjam", filter: {status_code: 'ongoing'}},
  {name: "Selesai", filter: {status_code: 'returned'}},
  {name: "Terlambat", filter: {status_code: 'overdue'}},
]
const activeTabIndex = ref()
</script>

<template>
  <div>
    <main class="flex flex-col gap-4">
      <div :class="$route.query[`${String($route.name)}_view`] == null || $route.query[`${String($route.name)}_view`] == 'read' ? '' : 'hidden'">
        <Tabs :config="tabConfig" v-model="activeTabIndex"></Tabs>
      </div>
      <BaseCRUD
        v-if="activeTabIndex != null"
        main
        :key="`${softReload().value['borrowing']}${activeTabIndex}`"
        :config="{...config, getQueryParameters: tabConfig[activeTabIndex].filter}"
        :configOverride="props.configOverride"
      >
        <template #s-returned_at="{data}">
          <div v-if="data.returned_at">{{ $parse('datetime', data.returned_at, 'parser') }}</div>
          <ConfirmationModal
            v-else
            :onConfirm="async () => {
              services.update('borrowing', {...data, returned_at: new Date(), status_code: 'returned'}).then(res => {
                toast().setSuccess('Berhasil mengembalikan buku!')
                softReload().triggerChange('borrowing')
              })
            }"
          >
            <template #trigger>
              <Button>Kembalikan Buku <Icon>chevron_right</Icon></Button>
            </template>
          </ConfirmationModal>
        </template>
      </BaseCRUD>
    </main>
  </div>
</template>

