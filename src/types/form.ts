import type { StringObject } from '.'
import type { Component } from 'vue'

export type FormTypes = 'text' | 'textarea' | 'radio' | 'date' | 'rich-select' | 'select' | 'file' | 'image' | 'lookup' | 'switch' | 'currency' | 'tag' | 'checkbox' | 'camera-input' | 'json-input' | 'custom' | 'location'

export type FormControls = {
  visibility?: {
    validator: (val: any) => any
    default?: boolean
  }
  value?: {
    generator: (val: any) => any
    default?: any
  }
  props?: {
    generator: (val: any, currVal: any) => any
    default?: Object
  }
}

export type FormField = {
  type: FormTypes
  span?: number
  props?: Record<string, any>
}
