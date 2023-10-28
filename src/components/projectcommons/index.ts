import { defineAsyncComponent } from 'vue'

const DocumentViewer = defineAsyncComponent(() => import('./DocumentViewer.vue'))

export { DocumentViewer }
