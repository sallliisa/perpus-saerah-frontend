import { defineAsyncComponent } from 'vue'

const DataFetcher = defineAsyncComponent(() => import('./DataFetcher.vue'))
const Pagination = defineAsyncComponent(() => import('./Pagination.vue'))

export { DataFetcher, Pagination }
