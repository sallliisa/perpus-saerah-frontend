<script setup lang="ts">
import { ref, onMounted, type PropType, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { Card, Button, Modal } from '@/components/base/index'
import { Switch } from '@/components/inputs/index'
import { Form, Detail, Table, ChipFilter } from '@/components/composites/index'
import { toast } from '@/stores/toast'
import type { BaseCRUDConfig, CRUDPermissions, StringObject } from '@/types'
import { softReload } from '@/stores/softreload'
import { getCRUDPermissions } from '@/utils/auth'
import { useDataModel } from '@/stores/datamodel'
import { userConfig } from '@/stores/userconfig'
import SearchBox from './SearchBox.vue'
import {defaultOnDelete, immutableDefaults} from '@/app/actions/BaseCRUD'
import Popover from '../base/Popover.vue'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

const route = useRoute()
type CRUDMode = 'create' | 'read' | 'show' | 'update' | 'delete'

const emit = defineEmits(['update:state'])
const props = defineProps({
  config: {
    type: Object as PropType<Partial<BaseCRUDConfig>>,
    required: true,
  },
  configOverride: {
    type: Object as PropType<Partial<BaseCRUDConfig>>,
    required: false,
    default: {}
  },
  hideCreate: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideUpdate: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideInfo: {
    type: Boolean,
    required: false,
    default: false,
  },
  disableTableActions: {
    type: Boolean,
    required: false,
    default: false,
  },
  main: {
    type: Boolean,
    required: false,
    default: false,
  },
  preservedParameters: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  ignoreModel: {
    type: Boolean,
    required: false,
    default: false,
  },
  onDelete: {
    type: Function as PropType<(targetAPI: string, id: number, key?: string) => Promise<void>>,
    required: false,
    default: defaultOnDelete,
  }
})

const baseConfig = ref<Partial<BaseCRUDConfig>>({
  name: '',
  modelAPI: '',
  getAPI: '',
  postAPI: '',
  fieldsExclude: [],
  dataExportURL: '',
})

const permissions = ref<CRUDPermissions>({
  view: false,
  lookup: false,
  show: false,
  create: false,
  update: false,
  delete: false,
})

const visibleFields = ref<StringObject<boolean>>({})
const loading = ref(false)

const tableProps = ref()
const filterFormProps = ref()
const createFormProps = ref()
const updateFormProps = ref()
const detailProps = ref()
const activeData = ref()

const getQueryParameters = ref<StringObject<any>>({})

const preflight = async () => {
  loading.value = true

  const configName = props.config.configName || props.config.name || (props.main ? String(route.name) : '')
  let [userConfigData, serviceDataModel] = await Promise.all([
    configName ? userConfig().get(configName) : {},
    // useDataModel().getDataModel(props.config.name || String(route.name)),
    {fieldList: undefined, fieldCreate: undefined, fieldUpdate: undefined, fieldView: undefined}
  ])

  let mergedConfig: Partial<BaseCRUDConfig> = {
    fieldList: serviceDataModel.fieldList,
    fieldAdd: serviceDataModel.fieldCreate,
    fieldEdit: serviceDataModel.fieldUpdate,
    fieldShow: serviceDataModel.fieldView,
  }
  Object.assign(mergedConfig, props.config)
  Object.assign(mergedConfig, props.configOverride)
  Object.assign(mergedConfig, userConfigData)
  baseConfig.value = mergedConfig
  baseConfig.value.inputConfig = { ...immutableDefaults.inputConfig, ...baseConfig.value.inputConfig }
  baseConfig.value.fieldsAlias = { ...immutableDefaults.fieldsAlias, ...baseConfig.value.fieldsAlias }
  baseConfig.value.fieldsType = { ...immutableDefaults.fieldsType, ...baseConfig.value.fieldsType }
  baseConfig.value.fieldsParse = { ...immutableDefaults.fieldsParse, ...baseConfig.value.fieldsParse }
  baseConfig.value.fieldsOverride = { ...immutableDefaults.fieldsOverride, ...baseConfig.value.fieldsOverride }
  baseConfig.value.fieldsExclude = [...(immutableDefaults.fieldsExclude || []), ...(baseConfig.value.fieldsExclude || [])]
  baseConfig.value.fieldsFilterable = [...(immutableDefaults.fieldsFilterable || []), ...(baseConfig.value.fieldsFilterable || [])]
  baseConfig.value.actions = {
    ...immutableDefaults.actions,
    ...mergedConfig.actions
  }
  Object.assign(baseConfig.value, { name: mergedConfig.name || route.name })
  Object.assign(baseConfig.value, { title: mergedConfig.title || route.meta.title })
  Object.assign(baseConfig.value, { modelAPI: mergedConfig.modelAPI || baseConfig.value.name })
  Object.assign(baseConfig.value, { getAPI: mergedConfig.getAPI || baseConfig.value.modelAPI })
  Object.assign(baseConfig.value, { postAPI: mergedConfig.postAPI || baseConfig.value.modelAPI })
  Object.assign(baseConfig.value, { showAPI: mergedConfig.showAPI || baseConfig.value.modelAPI })
  Object.assign(baseConfig.value, { createAPI: mergedConfig.createAPI || baseConfig.value.postAPI })
  Object.assign(baseConfig.value, { updateAPI: mergedConfig.updateAPI || baseConfig.value.postAPI })
  Object.assign(baseConfig.value, { deleteAPI: mergedConfig.deleteAPI || baseConfig.value.postAPI })
  Object.assign(baseConfig.value, { fieldList: mergedConfig.fieldList || [] })
  Object.assign(baseConfig.value, { fieldAdd: mergedConfig.fieldAdd || baseConfig.value.fieldList })
  Object.assign(baseConfig.value, { fieldEdit: baseConfig.value.fieldAdd || baseConfig.value.fieldEdit || baseConfig.value.fieldAdd })
  Object.assign(baseConfig.value, { fieldShow: mergedConfig.fieldShow || baseConfig.value.fieldList })
  Object.assign(baseConfig.value, { fieldEdit: mergedConfig.fieldEdit || baseConfig.value.fieldAdd })
  Object.assign(baseConfig.value, { uid: mergedConfig.uid || 'id' })
  Object.assign(baseConfig.value, { createAPI: mergedConfig.createAPI || baseConfig.value.postAPI })
  Object.assign(baseConfig.value, { getQueryParameters: mergedConfig.getQueryParameters || {} })
  Object.assign(baseConfig.value, { postQueryParameters: mergedConfig.postQueryParameters || {} })

  tableProps.value = {
    fieldsAlias: baseConfig.value.fieldsAlias,
    fieldsExclude: baseConfig.value.fieldsExclude,
    getAPI: baseConfig.value.getAPI,
    fieldsFormatter: baseConfig.value.fieldsFormatter,
    fieldsParse: baseConfig.value.fieldsParse,
    fieldsOverride: baseConfig.value.fieldsOverride,
    fieldsType: baseConfig.value.fieldsType,
    fieldsAlternateSource: baseConfig.value.fieldsAlternateSource,
    getQueryParameters: baseConfig.value.getQueryParameters,
    paginated: true,
    sortable: true,
  }

  filterFormProps.value = {
    fields: baseConfig.value.fieldsFilterable,
    fieldsExclude: baseConfig.value.fieldsExclude,
    fieldsAlias: baseConfig.value.fieldsAlias,
    inputConfig: baseConfig.value.inputConfig,
  }

  createFormProps.value = {
    fields: baseConfig.value.fieldAdd,
    fieldsExclude: baseConfig.value.fieldsExclude,
    fieldsAlias: baseConfig.value.fieldsAlias,
    inputConfig: baseConfig.value.inputConfig,
    targetAPI: baseConfig.value.createAPI,
    showAPI: baseConfig.value.showAPI,
    formType: 'create',
    getQueryParameters: baseConfig.value.getQueryParameters,
    postQueryParameters: baseConfig.value.postQueryParameters,
    onSuccess: (payload: StringObject<any>, res: StringObject<any>) => {
      setCRUDMode('read')
      toast().setSuccess('Berhasil mengubah data!')
      if (baseConfig.value.afterSubmit) baseConfig.value.afterSubmit(payload, res)
    }
  }

  updateFormProps.value = {
    ...createFormProps.value,
    fields: baseConfig.value.fieldEdit,
    targetAPI: baseConfig.value.updateAPI,
    formType: 'update',
    showIdKey: `${baseConfig.value.name}_id`,
  },

  detailProps.value = {
    fields: baseConfig.value.fieldShow,
    fieldsExclude: baseConfig.value.fieldsExclude,
    fieldsAlias: baseConfig.value.fieldsAlias,
    showAPI: baseConfig.value.showAPI,
    fieldsFormatter: baseConfig.value.fieldsFormatter,
    fieldsParse: baseConfig.value.fieldsParse,
    fieldsOverride: baseConfig.value.fieldsOverride,
    fieldsType: baseConfig.value.fieldsType,
    fieldsAlternateSource: baseConfig.value.fieldsAlternateSource,
    showIdKey: `${baseConfig.value.name}_id`,
  }
  loading.value = false
} 

const currentView = computed(() => route.query[`${baseConfig.value.name}_view`] ? route.query[`${baseConfig.value.name}_view`] : 'read')

const setCRUDMode = (mode: CRUDMode, id?: number) => {
  switch (mode) {
    case 'create':
      if (!props.hideCreate) router.push({ name: String(route.name), query: { ...route.query, [`${baseConfig.value.name}_view`]: 'create' } })
      break
    case 'read':
      activeData.value = undefined
      if (route.query.is_redirected == 'true') return
      if (props.main) {
        const newQuery = {}
        for (const key in route.query) if (props.preservedParameters.includes(key)) Object.assign(newQuery, { [key]: route.query[key] })
        router.push({ name: String(route.name), query: { ...newQuery, [`${baseConfig.value.name}_view`]: 'read' } })
      } else {
        console.log('pushing to', { name: String(route.name), query: { ...route.query, [`${baseConfig.value.name}_view`]: 'read' } })
        router.push({ name: String(route.name), query: { ...route.query, [`${baseConfig.value.name}_view`]: 'read' } })
      }
      break
    case 'show':
      router.push({ name: String(route.name), query: { ...route.query, [`${baseConfig.value.name}_view`]: 'show', [`${baseConfig.value.name}_id`]: id } })
      break
    case 'update':
      router.push({ name: String(route.name), query: { ...route.query, [`${baseConfig.value.name}_view`]: 'update', [`${baseConfig.value.name}_id`]: id } })
      break
    case 'delete':
      props.onDelete(baseConfig.value.modelAPI!, id!, `${baseConfig.value.name}_table`)
      break
    default:
      break
  }
}

onMounted(async () => {
  await preflight()
  Object.assign(permissions.value, getCRUDPermissions(baseConfig.value.name))
  if (!permissions.value.view) return
  Object.keys(route.query).forEach((key) => {
    if (key.includes('_datafilter')) {
      key = key.replace('_datafilter', '')
      Object.assign(getQueryParameters.value, { [key]: route.query[key] })
    }
  })
})

const CRUDModeDictionary: any = {
  create: 'Tambah Baru',
  read: '',
  show: 'Detail',
  update: 'Ubah',
  delete: 'Hapus',
}

function handleVisibleFields(field: string, enable: boolean) {
  if (!baseConfig.value.fieldList) return
  if (enable) {
    baseConfig.value.fieldList.push(field)
    baseConfig.value.fieldList = baseConfig.value.fieldList
  } else baseConfig.value.fieldList = baseConfig.value.fieldList.filter((item) => item !== field)
}

console.log("CLOG: BASECRUD MOUNTED")
</script>

<template>
  <Transition mode="out-in" name="bc" >
    <div :key="String(currentView)" v-if="permissions.view" class="flex flex-col gap-4">
      <component v-if="currentView == 'read'" :is="baseConfig.hideCard ? 'div' : Card">
        <div v-if="currentView == 'read'" class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <div class="flex w-full flex-row flex-wrap items-center justify-between gap-4">
              <h1 class="min-w-max text-xl">{{ baseConfig.title }}</h1>
              <div class="flex flex-row gap-4 divide-x divide-c-surface-variant dark:divide-cd-surface-variant">
                <div class="flex flex-row flex-nowrap gap-4">
                  <SearchBox v-model="getQueryParameters.search"/>
                  <div class="flex items-center justify-between gap-4">
                    <div class="flex flex-row gap-4">
                      <Popover v-if="baseConfig.fieldsFilterable?.length" :ignore="['#form-lookup']">
                        <template #trigger>
                          <Button square variant="tonal"><Icon>filter_alt</Icon></Button>
                        </template>
                        <template #content>
                          <Card class="w-[350px]" color="surface-high">
                            <Form static v-model="getQueryParameters" v-bind="filterFormProps">
                              <template #submitButton>
                                <Button @click="getQueryParameters = {search: getQueryParameters.search}">Reset Filter</Button>
                              </template>
                            </Form>
                          </Card>
                        </template>
                      </Popover>
                      <Modal :title="`Atur Kolom Tabel ${baseConfig.title}`">
                        <template #trigger>
                          <Button square variant="tonal"><Icon>table_rows</Icon></Button>
                        </template>
                        <template #content>
                          <div class="grid grid-cols-3 gap-8">
                            <div v-for="(field, index) in Object.keys(visibleFields)" class="flex max-h-fit flex-row items-center gap-4">
                              <Switch
                                v-model="visibleFields[field]"
                                :onDeactive="() => handleVisibleFields(field, false)"
                                :onActive="() => handleVisibleFields(field, true)"
                              />
                              <div>{{ (baseConfig.fieldsAlias as any)[field] || field }}</div>
                            </div>
                          </div>
                        </template>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div v-if="!hideCreate && baseConfig.actions?.create && permissions.create" class="pl-4 flex items-center">
                  <Button v-if="!$slots.createButton" @click="setCRUDMode('create')"><Icon>add</Icon>Tambah</Button>
                  <slot name="createButton" v-bind="{ props, setCRUDMode, currentView }"></slot>
                </div>
              </div>
            </div>
          </div>
          <ChipFilter v-if="props.config.mainFilter" :items="props.config.mainFilter[Object.keys(props.config.mainFilter)[0]]" v-model="(getQueryParameters as any)[Object.keys(props.config.mainFilter)[0]]"></ChipFilter>
          <Table 
            :key="softReload().value[`${baseConfig.name}_table`]"
            v-bind="tableProps"
            :fields="baseConfig.fieldList"
            :getQueryParameters="{...tableProps.getQueryParameters, ...getQueryParameters}"
            :onDataLoaded="(data: Array<any>) => visibleFields = data[0] ? Object.fromEntries(Object.keys(data[0]).map((field) => [field, (baseConfig.fieldList ?? []).includes(field)])) : {}"
          >
            <template v-for="slotname in Object.keys($slots)" v-slot:[String(slotname)]="data">
              <slot v-if="slotname.slice(0, 2) === 'l-'" :name="slotname" v-bind="(data as any)"></slot>
            </template>
            <template #l-tableActions="{data}">
              <slot v-if="$slots['l-tableActions']" name="l-tableActions" v-bind="{data, setCRUDMode}"></slot>
              <div v-else class="flex flex-row gap-2 items-center">
                <Button v-if="baseConfig.actions?.show && permissions.show" color="info" square @click="() => setCRUDMode('show', data.id)"><Icon>info</Icon></Button>
                <Button v-if="baseConfig.actions?.update && permissions.update" color="warning" square @click="() => setCRUDMode('update', data.id)"><Icon>edit</Icon></Button>
                <DeleteConfirmationModal v-if="baseConfig.actions?.delete && permissions.delete" :deleteAction="() => setCRUDMode('delete', data.id)"></DeleteConfirmationModal>
                <slot v-if="$slots['l-additionalTableActions']" name="l-additionalTableActions" v-bind="{data, setCRUDMode}"></slot>
              </div>
            </template>
          </Table>
        </div>
      </component>

      <template v-else>
        <!-- HEADER -->
        <Card v-if="!$slots.header" class="flex flex-row items-center gap-4">
          <Button @click="setCRUDMode('read')" variant="icon" square class="max-w-fit">
            <Icon>arrow_back</Icon>
          </Button>
          <div class="min-w-max text-xl">{{ CRUDModeDictionary[String(currentView)] }} {{ baseConfig.title }}</div>
        </Card>
        <slot v-else name="header"></slot>
        
        <!-- MODE: CREATE -->
        <component v-if="currentView == 'create' && baseConfig.actions?.create" :is="baseConfig.hideCard ? 'div' : Card">
          <div v-if="!$slots.create">
            <Form v-bind="createFormProps" />
          </div>
          <slot v-else name="create" v-bind="{baseConfig, setCRUDMode}"></slot>
        </component>

        <!-- MODE: UPDATE -->
        <component v-else-if="currentView == 'update' && baseConfig.actions?.update" :is="baseConfig.hideCard ? 'div' : Card">
          <div v-if="!$slots.update">
            <Form v-bind="updateFormProps" />
          </div>
          <slot v-else name="update" v-bind="{baseConfig, setCRUDMode}"></slot>
        </component>

        <!-- MODE: SHOW -->
        <template v-else-if="currentView == 'show' && baseConfig.actions?.show">
          <Card v-if="!$slots.show">
            <Detail v-bind="detailProps" @update:model-value="(event) => activeData = event"/>
          </Card>
          <slot v-else name="show" v-bind="{baseConfig, detailProps, setCRUDMode}"></slot>
          <slot v-if="$slots.additionalShow && activeData" name="additionalShow" v-bind="{data: activeData}"></slot>
        </template>
      </template>
    </div>
  </Transition>
</template>

<style>
.bc-enter-active,
.bc-leave-active {
  transition: opacity 0.1s ease;
}

.bc-enter-from,
.bc-leave-to {
  opacity: 0;
}
</style>