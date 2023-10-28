<script setup lang="ts">
import { ref, watch } from 'vue'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
//@ts-ignore-next-line
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism-tomorrow.css'
import { JSONfn } from '@/utils/common'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const testv = `{_WsNl__WsTb_"fieldsAlias":_Ws_{_WsNl__WsTb__WsTb_"task_code":_Ws_"Kode",_WsNl__WsTb__WsTb_"task_name":_Ws_"Permission",_WsNl__WsTb__WsTb_"task_group":_Ws_"Roles"_WsNl__WsTb_},_WsNl__WsTb_"gamer":_Ws_"_FUNCTION__WsNl__WsTb__WsTb__WsTb_(val)_Ws_=>_Ws_{_WsNl__WsTb__WsTb__WsTb__WsTb_const_Ws_gamer_Ws_=_Ws_true;_WsNl__WsTb__WsTb__WsTb__WsTb_if_Ws_(val_Ws_==_Ws_'gamer')_Ws_return_Ws_gamer_WsNl__WsTb__WsTb__WsTb_}_WsNl__WsTb__FUNCTION_"_WsNl_}`

const value = ref(
  props.modelValue
    .replace(/_Ws_/g, ' ')
    .replace(/_WsTb_/g, '  ')
    .replace(/_WsNl_/g, '\n')
)
// testv.replace(/_WsTb_/g, '\t').replace(/_WsNl_/g, '\n')

const highlighter = (value: string) => {
  return highlight(value, languages.json)
}

const checkJSON = (value: string) => {
  try {
    JSONfn.parse(value.replace(/_FUNCTION_([\s\S]*?)_FUNCTION_/g, ''))
    try {
      if (value.includes('_FUNCTION_')) {
        JSONfn.parse(
          value
            .replace(/_WsNl_/g, '\n')
            .replace(/_WsTb_/g, '  ')
            .replace(/_Ws_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/_FUNCTION_\s*/g, '_FUNCTION_')
            .replace(/_FUNCTION_([\s\S]*?)_FUNCTION_/g, '_NuFrRa_$1')
        )
      }
      return { success: true, message: 'Valid' }
    } catch (e: any) {
      return { success: false, message: `Function parser: ${e.message}` }
    }
  } catch (e) {
    return { success: false, message: e }
  }
}

const errorMessage = ref('')

const showErrorMessage = (message: string) => {
  const currentErrorMessage = errorMessage.value
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = currentErrorMessage
  }, 5000)
}

const validateJSON = () => {
  const regex1 = /\s/g
  const regex2 = /\,(?!\s*?[\{\[\"\'\w])/g
  const regex3 = /([,\{] *)(\w+):/g
  const regex4 = /([,\{] *"\w+":)(?! *-?[0-9\.]+[,\}])(?! *[\{\[])( *)([^,\}]*)/g
  const validatedJSON = value.value.replace(regex1, '').replace(regex2, '').replace(regex3, '$1"$2":').replace(regex4, '$1$2"$3"')
  try {
    JSONfn.parse(validatedJSON)
    value.value = JSONfn.stringify(JSONfn.parse(validatedJSON), 2)
  } catch (e) {
    showErrorMessage('Failed to validate JSON')
    return
  }
}

const formatJSON = () => {
  value.value = JSONfn.stringify(JSONfn.parse(value.value), 2)
}

watch(
  () => value.value,
  () => {
    emit('update:modelValue', value.value.replace(/\n/g, '_WsNl_').replace(/\s{2}/g, '_WsTb_').replace(/\s/g, '_Ws_'))
  }
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="item in [checkJSON(value)]" class="flex flex-row gap-2">
      <div class="max-w-fit px-2" :class="item.success ? 'bg-c-success-container text-c-success dark:bg-cd-success-container dark:text-cd-success' : 'bg-c-error-container text-c-error dark:bg-cd-error-container dark:text-cd-error'">{{ errorMessage || item.message || 'Valid' }}</div>
      <div v-if="!item.success" @click="validateJSON()" class="cursor-pointer text-c-secondary underline dark:text-cd-secondary">Attempt to Validate & Format</div>
      <div v-else @click="formatJSON()" class="cursor-pointer text-c-secondary underline dark:text-cd-secondary">Format</div>
    </div>
    <PrismEditor v-model="value" class="rounded-lg bg-c-surface-container-highest py-2 font-mono dark:bg-cd-surface-container-highest" :highlight="highlighter" line-numbers />
  </div>
</template>
