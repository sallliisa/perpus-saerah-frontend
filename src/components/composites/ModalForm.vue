<script setup lang="ts">
import Form from '@/components/composites/Form.vue'
import type { PropType } from 'vue'
import Modal from '@/components/base/Modal.vue'
import { defaultGetInitialData, defaultBeforeSubmit, defaultOnSubmit, defaultOnSuccess, defaultOnError } from '@/app/actions/Form';
import type { StringObject } from '@/types';

const props = defineProps({
  inputConfig: {
    type: Object,
    required: true,
  },
  fields: {
    type: Array<string>,
    required: false,
  },
  fieldsExclude: {
    type: Array<string>,
    required: false,
    default: [],
  },
  fieldsAlias: {
    type: Object,
    required: false,
    default: {}
  },
  getInitialData: {
    type: Function as PropType<(targetAPI: string, id: string | number, getQueryParameters?: object) => Promise<object>>,
    default: defaultGetInitialData
  },
  beforeSubmit: {
    type: Function as PropType<(formData: object) => object>,
    default: defaultBeforeSubmit
  },
  onSubmit: {
    type: Function as PropType<(payload: object, targetAPI: string, type: 'create' | 'update', postQueryParameters?: object) => Promise<object | void>>,
    default: defaultOnSubmit
  },
  onSuccess: {
    type: Function as PropType<(formData: object, res: StringObject<any>) => void>,
    default: defaultOnSuccess
  },
  onError: {
    type: Function as PropType<(formData: object, error: StringObject<any>) => void>,
    default: defaultOnError
  },
  targetAPI: {
    type: String,
    required: false,
    default: ''
  },
  showAPI: {
    type: String,
    required: false,
  },
  showIdKey: {
    type: String,
    required: false,
  },
  showDataId: {
    type: String,
    required: false,
  },
  formType: {
    type: String as PropType<'create' | 'update'>,
    required: false,
    default: 'create',
  },
  postQueryParameters: {
    type: Object,
    required: false,
    default: {}
  },
  getQueryParameters: {
    type: Object,
    required: false,
    default: {}
  },
  postAdditionalData: {
    type: Object,
    required: false,
    default: {}
  },
  static: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <Modal :class="($attrs.class as string)">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #content="{ closeModal }">
      <div class="flex flex-col gap-8">
        <slot v-if="$slots.header" name="header"></slot>
        <Form v-bind="{...props, onSuccess: undefined}" :onSuccess="(formData, res) => {props.onSuccess(formData, res); closeModal();}">
          <template #submitButton v-if="$slots.submitButton">
            <slot name="submitButton"></slot>
          </template>
          <template #cancelButton>
            <Button variant="tonal" @click="closeModal()">Batal</Button>
          </template>
        </Form>
        <slot v-if="$slots.footer" name="footer"></slot>
      </div>
    </template>
  </Modal>
</template>
