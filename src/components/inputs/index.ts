import { defineAsyncComponent } from 'vue'

const Checkbox = defineAsyncComponent(() => import('./Checkbox.vue'))
const Combobox = defineAsyncComponent(() => import('./Combobox.vue'))
const CurrencyInput = defineAsyncComponent(() => import('./CurrencyInput.vue'))
const FileInput = defineAsyncComponent(() => import('./FileInput.vue'))
const FileInputNamed = defineAsyncComponent(() => import('./FileInputNamed.vue'))
const ImageInput = defineAsyncComponent(() => import('./ImageInput.vue'))
const Input = defineAsyncComponent(() => import('./Input.vue'))
const PasswordInput = defineAsyncComponent(() => import('./PasswordInput.vue'))
const Radio = defineAsyncComponent(() => import('./Radio.vue'))
const RadioGroup = defineAsyncComponent(() => import('./RadioGroup.vue'))
const Select = defineAsyncComponent(() => import('./Select.vue'))
const Lookup = defineAsyncComponent(() => import('./Lookup.vue'))
const Switch = defineAsyncComponent(() => import('./Switch.vue'))
const TagInput = defineAsyncComponent(() => import('./TagInput.vue'))
const UploadDropzone = defineAsyncComponent(() => import('./UploadDropzone.vue'))
const CameraInput = defineAsyncComponent(() => import('./CameraInput.vue'))
const JSONInput = defineAsyncComponent(() => import('./JSONInput.vue'))
const Datepicker = defineAsyncComponent(() => import('./Datepicker.vue'))
const LocationInput = defineAsyncComponent(() => import('./LocationInput.vue'))

export { Checkbox, Combobox, CurrencyInput, FileInput, FileInputNamed, ImageInput, Input, PasswordInput, Radio, RadioGroup, Select, Lookup, Switch, TagInput, UploadDropzone, CameraInput, JSONInput, Datepicker, LocationInput }
