<script setup lang="ts">
import { ref, type PropType } from 'vue';
import LocationInput from './LocationInput.vue';
import BaseInput from './BaseInput.vue';
import { commonProps } from './commonprops';

const props = defineProps({
  ...commonProps,
})

const modelValue = defineModel<Array<any>>()

if (!modelValue.value) modelValue.value = []

const locationForm = {
  inputConfig: {
    name: {type: "text"},
  },
  fieldsAlias: {
    name: "Nama Lokasi"
  }
}

const tempLocation = ref()
</script>

<template>
  <BaseInput v-bind="props">
    <div class="flex flex-col gap-4">
      <Modal :onClose="() => tempLocation = null">
        <template #trigger>
          <Button><Icon>add</Icon>Tambah Lokasi</Button>
        </template>
        <template #content="{closeModal}">
          <LocationInput v-model="tempLocation" :formConfig="locationForm"/>
          <Button @click="() => [modelValue?.push(tempLocation), closeModal()]">Simpan</Button>
        </template>
      </Modal>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8 flex flex-row flex-wrap gap-4">
          <template v-if="modelValue?.length">
            <Modal v-for="item in modelValue" :onOpen="() => tempLocation = item" :onClose="() => tempLocation = null">
              <template #trigger>
                <Card color="surface-high" class="flex flex-row items-center max-w-fit h-full" interactive>
                  <Icon>pin_drop</Icon>
                  <div v-if="item.name" class="flex flex-col">
                    <div>{{ item.name }}</div>
                    <div class="text-sm text-muted">{{ item.lat }}, {{ item.lng }}</div>
                  </div>
                  <div v-else>{{ item.lat }}, {{ item.lng }}</div>
                </Card>
              </template>
              <template #content="{closeModal}">
                <LocationInput v-model="tempLocation" :formConfig="locationForm"/>
                <Button @click="closeModal">Simpan</Button>
              </template>
            </Modal>
          </template>
          <div v-else class="text-muted">Belum ada lokasi yang ditambahkan</div>
        </div>
        <div class="col-span-4"></div>
      </div>
    </div>
  </BaseInput>
</template>