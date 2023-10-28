<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { ModalForm } from '@/components/composites'
import { DeleteConfirmationModal } from '@/components/composites'

const expanded = ref<boolean>(false)

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
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
  parentKey: {
    type: String,
    required: false,
    default: 'parent_id',
  },
  descriptionKey: {
    type: String,
    required: false,
    default: 'description',
  },
  enableActions: {
    type: Boolean,
    required: false,
    default: false,
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
  <div class="flex w-full flex-col gap-2">
    <div class="flex w-full flex-row items-center gap-2">
      <div v-for="_ in props.depth" class="aspect-square min-h-[3px] min-w-[3px] rounded-full bg-c-secondary dark:bg-cd-secondary ml-3 mb-4"></div>
      <div class="group/actions mt-[6px] flex w-full flex-row items-start gap-2">
        <Button v-if="props.item.children?.length" @click="expanded = !expanded" square small variant="icon">
          <Icon :class="`${!props.item.children?.length ? 'text-transparent' : 'text-c-primary dark:text-cd-primary'}`">{{ expanded ? 'chevron_right' : 'expand_more' }}</Icon>
        </Button>
        <div v-else @click="expanded = !expanded" class="p-1">
          <Icon :class="`${!props.item.children?.length ? 'text-transparent' : 'text-c-primary dark:text-cd-primary'}`">{{ expanded ? 'chevron_right' : 'expand_more' }}</Icon>
        </div>
        <div class="flex w-full flex-col items-start gap-1">
          <div class="flex w-full flex-row gap-2">
            <button v-if="props.item.children?.length" @click="expanded = !expanded" class="text-lg" :class="props.depth == 0 ? 'font-semibold' : ''">{{ item[props.view] }}</button>
            <div v-else class="text-lg" :class="props.depth == 0 ? 'font-semibold' : ''">{{ item[props.view] }}</div>
            <div v-if="props.inputConfig" class="flex flex-row gap-2 opacity-0 group-hover/actions:opacity-100">
              <ModalForm :inputConfig="props.inputConfig" :alias="props.alias" :postQuery="{[props.parentKey]: item.id}" formType="create" :submitAction="props.createSubmitAction" :afterSubmit="props.createAfterSubmit" :beforeSubmit="props.createBeforeSubmit">
                <template #trigger>
                  <Button square small variant="icon"><Icon>add</Icon></Button>
                </template>
              </ModalForm>
              <ModalForm :inputConfig="props.inputConfig" :alias="props.alias" :postQuery="{[props.parentKey]: item.id}" formType="update" :initialData="item" :submitAction="props.updateSubmitAction" :afterSubmit="props.updateAfterSubmit" :beforeSubmit="props.updateBeforeSubmit">
                <template #trigger>
                  <Button square small variant="icon" color="warning"><Icon>edit</Icon></Button>
                </template>
              </ModalForm>
              <DeleteConfirmationModal v-if="props.deleteAction" :deleteAction="() => props.deleteAction!(item)">
                <template #trigger>
                  <Button square small variant="icon" color="error"><Icon>delete_forever</Icon></Button>
                </template>
              </DeleteConfirmationModal>
            </div>
          </div>
          <div class="text-muted text-sm">{{ item[props.descriptionKey] || '-' }}</div>
        </div>
      </div>
    </div>
    <TreeLeaf v-show="props.item.children?.length && expanded" v-for="child in props.item.children" v-bind="{...props, item: child, depth: props.depth + 1}"></TreeLeaf>
  </div>
</template>
