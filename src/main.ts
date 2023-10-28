import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import { filter } from './filters/index'
import { formatCurrency, formatDate, formatNumber, formatTime, formatDateTime } from '@/utils/common'
import { promiseHandler } from './stores/promisehandler'

import App from './App.vue'
import router from './router'
import '@vuepic/vue-datepicker/dist/main.css'
import './assets/main.css'

const app = createApp(App)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $parse: (key: string, value: string | number, mode?: 'dictionary' | 'parser') => string
    $promiseHandler: ReturnType<typeof promiseHandler>
  }
}

app.use(createPinia())
app.use(router)

app.config.globalProperties.$parse = (key: string, value: string | number, mode: 'dictionary' | 'parser' = 'dictionary') => {
  if (mode === 'dictionary') {
    return filter[key]?.[value] || 'WARN: KEY IS UNDEFINED'
  } else {
    return {
      number: formatNumber,
      currency: formatCurrency,
      date: formatDate,
      time: formatTime,
      datetime: formatDateTime,
    }[key as 'number' | 'currency' | 'date' | 'time' | 'datetime'](value as any)
  }
}

app.config.globalProperties.$promiseHandler = promiseHandler()

const definedGlobalComponents = [
  { name: 'Alert', class: 'base' },
  { name: 'Button', class: 'base' },
  { name: 'Card', class: 'base' },
  { name: 'Chip', class: 'base' },
  { name: 'Icon', class: 'base' },
  { name: 'Modal', class: 'base' },
  { name: 'Skeleton', class: 'base' },
  { name: 'Spinner', class: 'base' },
  { name: 'Tooltip', class: 'base' },
  { name: 'DataFetcher', class: 'utils' },
  { name: 'Pagination', class: 'utils' },
]

definedGlobalComponents.forEach((component) => {
  app.component(
    component.name,
    defineAsyncComponent(() => import(`./components/${component.class}/${component.name}.vue`))
  )
})

app.mount('#app')
