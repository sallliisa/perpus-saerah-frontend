import type { Component } from 'vue'
import type { FormField } from './form'

export interface FormObject {
  [key: string]: FormField
}

export type Action = 'READ_DETAIL' | 'UPDATE' | 'DELETE'
export type Methods = {
  list?: boolean
  detail?: boolean
  create?: boolean
  update?: boolean
}

export type Field = {
  id: string
  label: string
  source?: string | null
  methods?: Methods
  visible?: boolean
}

export type TabConfig = {
  name: string
  component: Component
  props?: Object
}

export type CRUDPermissions = {
  view: boolean
  lookup: boolean
  show: boolean
  create: boolean
  update: boolean
  delete: boolean
}

export type Model = {
  fieldList?: Array<string>
  fieldView?: Array<string>
  fieldAdd?: Array<string>
  fieldEdit?: Array<string>
}

export type FieldPage = {
  name: string
  fields: Array<string>
}

export type StringObject<T = string> = {
  [key: string]: T
}

export type FieldsType = { [key: string]: { type: string; [key: string]: string | boolean | { [key: string]: any } } }

export type BaseCRUDConfig = {
  title?: string
  loadkey?: string
  name: string
  modelAPI: string
  getAPI: string
  postAPI: string
  showAPI?: string
  createAPI?: string
  updateAPI?: string
  deleteAPI?: string
  mainFilter?: { [key: string]: Array<{ id: string; label: string }> }
  configName?: string
  fieldList?: Array<string>
  fieldShow?: Array<string>
  fieldAdd?: Array<string>
  fieldAddPaginated?: Array<FieldPage>
  fieldEdit?: Array<string>
  getQueryParameters?: StringObject
  postQueryParameters?: StringObject
  fieldsAlias?: StringObject
  fieldsAlternateSource?: StringObject
  fieldsExclude: Array<string>
  infoFields?: Array<string>
  fieldsOverride?: StringObject<StringObject>
  inputConfig?: FormObject
  fieldsFilterable?: Array<string>
  fieldsType?: FieldsType
  fieldsParse?: StringObject
  fieldsVisibility?: StringObject<boolean>
  tableActionsLocation?: 'left' | 'right'
  hideCard?: boolean
  uid?: string
  actions?: {
    create?: boolean
    update?: boolean
    delete?: boolean
    show?: boolean
  }
  additionalColumns?: Array<object>
  fieldsFormatter?: StringObject<(value: any) => string>
  dataExportURL?: string
  beforeSubmit?: (data: any) => any // Modifies data form before submit
  submitAction?: (data: any) => any // Submits data
  afterSubmit?: (data: any, res: any) => any // Effect action on successful submit
}

export type CRUDMode = 'create' | 'read' | 'read_detail' | 'update' | 'delete'

export type TableField = {
  id: string
  label: string
  visible: boolean
}

export type RouteSeparator = {
  separator: string
}

export type Route = {
  title: string
  name: string
  icon: string
  meta?: Object
}

export type Module = {
  title: string
  name: string
  permission?: string
  icon: string
  description?: string
  meta?: Object
  routes: Array<Route | RouteSeparator | Module>
  children?: Array<Route>
}

export type Modules = Array<Module>

export type QueryParameters = {
  page?: number
  limit?: number
  sort_by?: string
  sort?: string
  search?: string
  filters?: Object
  [key: string]: any
}
