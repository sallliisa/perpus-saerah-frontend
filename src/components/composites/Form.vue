<script setup lang="ts">
import { ref, type PropType, defineAsyncComponent, watch } from 'vue';
import {defaultBeforeSubmit, defaultGetInitialData, defaultOnError, defaultOnSubmit, defaultOnSuccess} from '@/app/actions/Form'
import type { StringObject } from '@/types';
import { toast } from '@/stores/toast';
import { useRoute } from 'vue-router';
import {componentTypeMap as typeConfigMap} from './common/properties'
import { softReload } from '@/stores/softreload';

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

const route = useRoute()
const modelValue = defineModel<any>()

const fields = ref((props.fields || Object.keys(props.inputConfig || {})).filter((field => !props.fieldsExclude.includes(field))))
console.log('fields', fields.value)

const formData = ref<StringObject<any>>({})
const formErrors = ref<StringObject<string>>({})

export type FieldDependency = {
  field: string
  visibility: {
    validator: Function
    default: boolean
    value?: boolean
  }
  props: {
    generator: Function
    default: boolean
    value?: StringObject<any>
  }
}

const loading = ref({
  get: false,
  post: false
})
const fieldDependencyData = ref<{[key: string]: FieldDependency}>({})

const customComponentMap: any = {}

function buildInputConfig() {
  fields.value.forEach((field) => {
    if (props.inputConfig[field]) {
      (props.inputConfig[field].props ??= {}).label ??= props.fieldsAlias[field] ?? field
      if (props.inputConfig[field].dependency) fieldDependencyData.value[field] = {
        field: props.inputConfig[field].dependency.field,
        visibility: props.inputConfig[field].dependency.visibility ? {...props.inputConfig[field].dependency.visibility, value: undefined} : undefined,
        props: props.inputConfig[field].dependency.props ? {...props.inputConfig[field].dependency.props, value: undefined} : undefined
      }
      if (typeConfigMap[props.inputConfig[field].type])  {
        Object.assign(
          props.inputConfig[field].props,
          Object.fromEntries(typeConfigMap[props.inputConfig[field].type].propKeyValue?.map((property) => [property[0], formData.value?.[property[1]]]) || [])
        )
      }
      if (props.inputConfig[field].type === 'custom') customComponentMap[field] = defineAsyncComponent(() => import(`@/components/projectcommons/${props.inputConfig[field].componentName}.vue`))
    }
  })
}

async function preflight() {
  loading.value.get = true
  if (props.formType === 'update') {
    formData.value = await props.getInitialData(props.showAPI || props.targetAPI, props.showDataId || String(route.query[props.showIdKey || '']) || '', props.getQueryParameters)
  }
  if (props.static) {
    watch(formData.value, () => {
      modelValue.value = formData.value
    }, {deep: true})
    watch(() => modelValue.value, () => {
      formData.value = modelValue.value
    }, {deep: true})
    formData.value = modelValue.value
  }
  buildInputConfig()
  loading.value.get = false
}

async function submitForm() {
  const requiredFields = fields.value.filter((field) => props.inputConfig[field]?.props?.required)
  requiredFields.forEach((field) => {
    if (!formData.value[field]) {
      formErrors.value[field] = 'Harus diisi!'
    } else {
      formErrors.value[field] = ''
    }
  })
  if (Object.values(formErrors.value).some((error) => error)) {
    toast().setError("Masih terdapat data yang kosong atau tidak valid!")
    return
  }
  Object.keys(formData.value).forEach((field) => {
    if (fieldDependencyData.value[field]?.visibility?.value === false) formData.value[field] = null
  })
  const payload = props.beforeSubmit({...formData.value, ...props.postAdditionalData})
  loading.value.post = true
  try {
    const res = await props.onSubmit(payload, props.targetAPI, props.formType, props.postQueryParameters)
    props.onSuccess(res || {}, payload)
  } catch (error: any) {
    props.onError(payload, error)
  }
  loading.value.post = false
}

function revalidateFieldDependency(field: string) {
  if (fieldDependencyData.value[field].visibility) fieldDependencyData.value[field].visibility.value = fieldDependencyData.value[field].visibility.validator(formData.value[fieldDependencyData.value[field].field]) ?? fieldDependencyData.value[field].visibility.default
  if (fieldDependencyData.value[field].props) fieldDependencyData.value[field].props.value = fieldDependencyData.value[field].props.generator(formData.value[fieldDependencyData.value[field].field]) ?? fieldDependencyData.value[field].props.default
  softReload().triggerChange(field)
}

const componentTypeMap: any = {
  text: defineAsyncComponent(() => import('@/components/inputs/Input.vue')),
  textarea: defineAsyncComponent(() => import('@/components/inputs/Textarea.vue')),
  password: defineAsyncComponent(() => import('@/components/inputs/PasswordInput.vue')),
  file: defineAsyncComponent(() => import('@/components/inputs/FileInput.vue')),
  image: defineAsyncComponent(() => import('@/components/inputs/ImageInput.vue')),
  select: defineAsyncComponent(() => import('@/components/inputs/Select.vue')),
  radio: defineAsyncComponent(() => import('@/components/inputs/RadioGroup.vue')),
  date: defineAsyncComponent(() => import('@/components/inputs/Datepicker.vue')),
  time: defineAsyncComponent(() => import('@/components/inputs/Timepicker.vue')),
  daterange: defineAsyncComponent(() => import('@/components/inputs/RangeDatepicker.vue')),
  month: defineAsyncComponent(() => import('@/components/inputs/MonthPicker.vue')),
  tag: defineAsyncComponent(() => import('@/components/inputs/TagInput.vue')),
  currency: defineAsyncComponent(() => import('@/components/inputs/CurrencyInput.vue')),
  switch: defineAsyncComponent(() => import('@/components/inputs/Switch.vue')),
  checkbox: defineAsyncComponent(() => import('@/components/inputs/Checkbox.vue')),
  lookup: defineAsyncComponent(() => import('@/components/inputs/Lookup.vue')),
  location: defineAsyncComponent(() => import('@/components/inputs/LocationInput.vue')),
  "multi-location": defineAsyncComponent(() => import('@/components/inputs/MultiLocationInput.vue'))
}

preflight()

const fieldDependencyTarget = ref<StringObject<string[]>>({})

for (const entry of Object.entries(fieldDependencyData.value)) {
  if (!fieldDependencyTarget.value[entry[1].field]) fieldDependencyTarget.value[entry[1].field] = []
  fieldDependencyTarget.value[entry[1].field].push(entry[0])
}

Object.keys(fieldDependencyTarget.value).forEach((target) => {
  watch(() => formData.value[target], () => {
    fieldDependencyTarget.value[target].forEach((field) => revalidateFieldDependency(field))
  })
})
</script>

<template>
  <div>
    <div v-if="!loading.get">
      <form @submit.prevent="submitForm" class="grid w-full grid-cols-12 grid-rows-[fit-content] items-center gap-x-2 gap-y-8">
        <template v-for="field in fields" v-show="!fieldDependencyData[field] ? true : !fieldDependencyData[field].visibility ? true : fieldDependencyData[field].visibility.value">
          <Card v-if="field.slice(0, 2) === 'S|'" color="info-container" class="col-span-full font-bold">{{ field.slice(2) }}</Card>
          <template v-else-if="inputConfig[field]">
            <div v-if="!fieldDependencyData[field] ? true : !fieldDependencyData[field].visibility ? true : fieldDependencyData[field].visibility.value" :style="{gridColumn: `span ${props.inputConfig[field].span || 12} / span ${props.inputConfig[field].span || 12}`}">
              <div v-if="componentTypeMap[inputConfig[field]?.type]">
                <component :key="softReload().value[field]" :is="componentTypeMap[inputConfig[field].type]" v-bind="{...fieldDependencyData[field]?.props?.value, ...inputConfig[field].props}" v-model="formData[field]" :error="formErrors[field]" />
              </div>
              <div v-else-if="inputConfig[field].type === 'custom'">
                <Suspense>
                  <component :is="customComponentMap[field]" v-model="formData[field]" :formData="formData" v-bind="{...fieldDependencyData[field]?.props?.value, ...inputConfig[field].props}"/>
                </Suspense>
              </div>
            </div>
          </template>
          <Card v-else color="warning" class="col-span-12">WARN: inputConfig[{{ field }}] is undefined</Card>
        </template>
        <div v-if="!props.static" class="col-span-12 flex">
          <Button v-if="!$slots.submitButton" class="max-w-fit" :type="'submit'" :disabled="loading.get && loading.post">Submit</Button>
          <slot v-else name="submitButton" v-bind="{loading: loading.get && loading.post, submitForm}"></slot>
        </div>
      </form>
    </div>
  </div>
</template>
