<script setup lang="ts">
import type { PropType } from 'vue';
import { onMounted } from 'vue';
import type { StringObject } from '@/types';
import Input from '@/components/inputs/Input.vue'
import Select from '@/components/inputs/Select.vue'
import Switch from '@/components/inputs/Switch.vue'
import {DeleteConfirmationModal} from '@/components/composites';

const formTypes = [
  {id: 'text', name: 'Jawaban Singkat'},
  {id: 'textarea', name: 'Paragraph'},
  {id: 'radio', name: 'Pilihan Ganda'},
  {id: 'date', name: 'Tanggal'},
  {id: 'select', name: 'Dropdown'},
  {id: 'file', name: 'File'},
  {id: 'image', name: 'Gambar'},
  {id: 'switch', name: 'Switch'},
  {id: 'currency', name: 'Mata Uang'},
  {id: 'checkbox', name: 'Checkbox'},
]

type ExternalFormConfig = {
  id: number,
  label: string,
  type: string,
  items?: { id?: string | boolean | number; name: string; }[],
  allowMulti?: boolean, // image, file
  description?: string, // checkbox, switch
}

const modelValue = defineModel({
  type: Object as PropType<ExternalFormConfig[]>,
  default: () => []
})

const specificProperties: StringObject<Partial<ExternalFormConfig>> = {
  radio: {
    items: [{id: '', name: ''}]
  },
  file: {
    allowMulti: false
  },
  image: {
    allowMulti: false
  },
  checkbox: {
    description: ''
  },
  switch: {
    description: ''
  },
}

const createNewFormObject = (type: string) => {
  return {label: '', type: type, ...(specificProperties as any)[type]}
}

const appendFormObject = (type: string) => {
  modelValue.value.push(createNewFormObject(type))
}

const removeFormObject = (index: number) => {
  setTimeout(() => {
    modelValue.value.splice(index, 1)
  }, 150)
}

const handleChangeFormType = (type: any, index: number) => {
  modelValue.value[index] = createNewFormObject(type)
}

const addOption = (context: Array<any>) => {
  context.push(structuredClone(specificProperties.radio.items![0]))
}

const removeOption = (context: Array<any>, index: number) => {
  context.splice(index, 1)
}

// onMounted(() => {
//   if (modelValue.value.length == 0) {
//     appendFormObject('text')
//   }
// })
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="!modelValue.length" class="text-muted flex ites-center justify-center">Tekan tombol tambah untuk menambah pertanyaan</div>
    <Card v-for="(item, index) in modelValue">
      <div class="grid grid-cols-12 gap-4">
        <Input class="col-span-10" :placeholder="'Pertanyaan'" v-model="item.label"/>
        <div class="flex flex-row gap-4 col-span-2">
          <Select :direction="'bottom'" class="w-full" :items="formTypes" :model-value="item.type" @update:model-value="handleChangeFormType($event, index)" ></Select>
          <DeleteConfirmationModal :deleteAction="() => removeFormObject(index)">
            <template #trigger>
              <Button variant="icon" square><Icon>delete_forever</Icon></Button>
            </template>
          </DeleteConfirmationModal>
        </div>
      </div>
      <div v-if="item.items" class="flex flex-col gap-4">
        <div v-for="(option, optindex) in item.items" class="flex flex-row gap-2 items-center">
          <Icon class="text-muted">radio_button_unchecked</Icon>
          <Input v-model="option.name" :placeholder="`Pilihan ${optindex+1}`"/>
          <Button v-if="item.items.length > 1" @click="removeOption(item.items, optindex)" variant="icon" square><Icon>close</Icon></Button>
        </div>
        <Button @click="addOption(item.items)" variant="tonal" class="w-fit"><Icon>add</Icon>Tambah Opsi</Button>
      </div>
      <div v-if="item.description != undefined">
        <Input v-model="item.description" :placeholder="'Label'"/>
      </div>
      <div v-if="item.allowMulti != undefined">
        <Switch v-model="item.allowMulti" :description="'Izinkan banyak file?'"/>
      </div>
    </Card>
    <div class="w-full flex items-center justify-end">
      <Button @click="appendFormObject('text')"><Icon>add</Icon></Button>
    </div>
  </div> 
</template>

