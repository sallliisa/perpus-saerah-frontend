<script setup lang="ts">
import RailItem from './layouts/RailItem.vue'
import RailExpand from './layouts/RailExpand.vue'
import { modules } from '@/stores/modules'
import { useSidebarStore } from '@/stores/sidebar'
import { useScreenStore } from '@/stores/screen'
import Logo from '@/assets/corporate/common/Logo.vue'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { softReload } from '@/stores/softreload'

const sidebar = ref()
const sidebarexpand = ref()
onClickOutside(
  sidebarexpand,
  (event) => {
    useSidebarStore().setOpen(false)
    if (useScreenStore().isOrLess('lg')) {
      useSidebarStore().toggleVisibility()
    }
    if (useSidebarStore().index == 999) {
      useSidebarStore().setIndex(-1)
    }
  },
  { ignore: ['#sidebar', '#dialog', 'input', '#file', 'input#file'] }
)

const route = useRoute()
const router = useRouter()

watch(
  () => route.name,
  (routename) => {
    if (routename != 'login') {
      const currentModuleIndex = modules().value.findIndex((item: any) => item.name == route.path.split('/')[1])
      useSidebarStore().index = currentModuleIndex
      softReload().triggerChange('module')
    }
  }
)

const handleRailItemClick = (item: any, index: number) => {
  if (useSidebarStore().index == index) {
    if (useSidebarStore().index != -1) {
      useSidebarStore().setOpen(true)
    } else if (useScreenStore().isAtLeast('lg')) {
      useSidebarStore().resetState()
    } else {
      if (item.routes.length == 1) {
        useSidebarStore().toggleVisibility()
      }
    }
  } else {
    useSidebarStore().setIndex(index)
    if (item.routes.length == 1) {
      router.push('/' + item.name.toLowerCase() + '/' + (item.routes[0] as any).name.toLowerCase())
      useSidebarStore().setOpen(false)
      useSidebarStore().toggleVisibility()
    } else {
      useSidebarStore().setOpen(true)
    }
  }
}

const handleUserIconClick = () => {
  if (useSidebarStore().index == 999) {
    if (useSidebarStore().index != -1) {
      useSidebarStore().setOpen(true)
    } else if (useScreenStore().isAtLeast('lg')) {
      useSidebarStore().resetState()
    }
  } else {
    useSidebarStore().setOpen(true)
    useSidebarStore().setIndex(999)
  }
}
</script>

<template>
  <div ref="sidebar" id="sidebar" class="fixed z-50 flex flex-row lg:relative lg:left-0 lg:z-0">
    <div :key="'sidebar'" class="sticky top-0 flex h-screen max-h-screen w-24 flex-col items-center justify-between gap-4 overflow-auto bg-c-surface-container py-8 dark:bg-cd-surface-container">
      <div class="p-4">
        <Logo class="w-16"></Logo>
      </div>
      <div class="flex h-full w-full flex-col items-start gap-4 overflow-auto">
        <RailItem v-for="(item, index) in modules().value" :title="item.title" :active="item.name == $route.fullPath.split('/')[1]" @click="handleRailItemClick(item, index)">
          <Icon :size="24" :FILL="item.name == $route.fullPath.split('/')[1] ? 1 : 0">{{ item.icon }}</Icon>
        </RailItem>
      </div>
      <RailItem :title="''" @click="handleUserIconClick()" :active="useSidebarStore().index == 999">
        <Icon class="mt-1" :size="24" :FILL="useSidebarStore().index == 999 ? 1 : 0">trip_origin</Icon>
      </RailItem>
    </div>
  </div>
  <div class="fixed left-24 z-10 flex flex-row">
    <Transition name="sidebar">
      <RailExpand ref="sidebarexpand" :key="'expandables'" v-if="useSidebarStore().open && (useSidebarStore().index == 999 ? true : modules().value[useSidebarStore().index]?.routes?.length > 1)" :submenus="useSidebarStore().index == 999 ? {} : modules().value[useSidebarStore().index]" />
    </Transition>
  </div>
</template>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.35s cubic-bezier(0.05, 0.7, 0.1, 1);
}
.sidebar-enter-from,
.sidebar-leave-to {
  width: 0px;
}
.sidebar-enter-to,
.sidebar-leave-from {
  width: 288px;
}
.sidebar-move {
  transition: all 0.35s cubic-bezier(0.05, 0.7, 0.1, 1);
}
</style>
