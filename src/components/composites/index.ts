import { defineAsyncComponent } from 'vue'

const BaseCRUD = defineAsyncComponent(() => import('./BaseCRUD.vue'))
const ChipFilter = defineAsyncComponent(() => import('./ChipFilter.vue'))
const Detail = defineAsyncComponent(() => import('./Detail.vue'))
const DeleteConfirmationModal = defineAsyncComponent(() => import('./DeleteConfirmationModal.vue'))
const DisclosureGroup = defineAsyncComponent(() => import('./DisclosureGroup.vue'))
const Form = defineAsyncComponent(() => import('./Form.vue'))
const FormCreator = defineAsyncComponent(() => import('./FormCreator.vue'))
const ModalForm = defineAsyncComponent(() => import('./ModalForm.vue'))
const Table = defineAsyncComponent(() => import('./Table.vue'))

export { BaseCRUD, ChipFilter, Detail, DisclosureGroup, DeleteConfirmationModal, Form, FormCreator, ModalForm, Table }
