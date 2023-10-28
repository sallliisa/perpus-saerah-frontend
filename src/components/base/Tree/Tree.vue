<script setup lang="ts">
import type { PropType } from 'vue';
import TreeLeaf from './TreeLeaf.vue'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  enableActions: {
    type: Boolean,
    required: false,
    default: false,
  },
  parentKey: {
    type: String,
    required: false,
    default: 'parent_id',
  },
  view: {
    type: String,
    required: false,
    default: 'name',
  },
  alias: {
    type: Object,
    required: false,
  },
  descriptionKey: {
    type: String,
    required: false,
    default: 'description',
  },
  inputConfig: {
    type: Object,
    required: false,
  },
  createSubmitAction: {
    type: Function,
    required: false,
  },
  createAfterSubmit: {
    type: Function,
    required: false,
  },
  createBeforeSubmit: {
    type: Function as PropType<(formData: object) => object>,
    required: false,
  },
  updateSubmitAction: {
    type: Function,
    required: false,
  },
  updateAfterSubmit: {
    type: Function,
    required: false,
  },
  updateBeforeSubmit: {
    type: Function as PropType<(formData: object) => object>,
    required: false,
  },
  deleteAction: {
    type: Function,
    required: false,
  },
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <TreeLeaf v-for="data in props.data" v-bind="{ ...props, data: undefined, item: data }"> </TreeLeaf>
  </div>
</template>
