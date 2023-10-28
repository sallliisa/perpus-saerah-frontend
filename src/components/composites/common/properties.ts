import type { StringObject } from '@/types'
import { defineAsyncComponent } from 'vue'

export const componentTypeMap: StringObject<{component: any, propKeyValue?: string[][]}> = {
  chip: { component: defineAsyncComponent(() => import('@/components/base/Chip.vue')) },
  image: {
    component: defineAsyncComponent(() => import('@/components/base/ImagePreview.vue')),
    propKeyValue: [['url', 'preview'], ['thumbnail', 'preview']],
  },
  location: {
    component: defineAsyncComponent(() => import('@/components/base/MapView.vue')),
    propKeyValue: [['lat', 'latitude'], ['lng', 'longitude']],
  }
}

export const parsedTypes = ['date', 'datetime', 'currency', 'number', 'unit']