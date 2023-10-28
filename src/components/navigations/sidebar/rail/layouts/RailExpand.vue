<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { titleCase } from '@/utils/common'
import { useScreenStore } from '@/stores/screen'
import ProfileSegment from '../../../layouts/ProfileSegment.vue'

const props = defineProps({
  submenus: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div v-if="$route.name != 'login'" class="z-10 overflow-hidden rounded-r-2xl border-x border-c-surface-variant/[25%] bg-c-surface-container text-c-on-surface dark:border-cd-surface-variant/[25%] dark:bg-cd-surface-container dark:text-cd-on-surface">
    <div class="sticky top-0 -z-10 flex h-screen min-w-[288px] max-w-[288px] flex-col justify-between gap-8 overflow-auto rounded-r-2xl p-8">
      <div v-if="useSidebarStore().index === 999" class="flex h-full flex-col gap-8">
        <div v-if="useScreenStore().isOrLess('md')" class="flex flex-col gap-4">
          <div class="flex flex-row items-center justify-between">
            <button @click=";[useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]"><Icon>close</Icon></button>
          </div>
        </div>
        <ProfileSegment />
      </div>
      <div v-else-if="props.submenus" class="flex flex-col gap-8 rounded-xl">
        <div v-if="useScreenStore().isOrLess('md')" class="flex flex-col gap-4">
          <div class="flex flex-row items-center justify-end">
            <button @click=";[useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]"><Icon>close</Icon></button>
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="flex w-full flex-col justify-center rounded-xl bg-c-secondary px-4 py-8 text-c-on-secondary dark:bg-cd-secondary dark:text-cd-on-secondary">
            <div class="text-2xl font-bold">{{ submenus.title }}</div>
            <div class="text-sm text-c-on-secondary dark:text-cd-on-secondary">{{ submenus.description }}</div>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="submenu in props.submenus.routes">
              <div v-if="submenu.separator" class="text-c-muted px-4 py-2 text-sm">{{ submenu.separator }}</div>
              <button v-else-if="$route.name == submenu.name" @click=";[$router.push('/' + submenus.name.toLowerCase() + '/' + submenu.name.toLowerCase()), useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]" class="overlay flex w-full flex-row items-center gap-4 rounded-full bg-c-secondary-container p-4 text-c-on-secondary-container after:hover:bg-c-on-secondary-container/[8%] after:active:bg-c-on-secondary-container/[12%] dark:bg-cd-secondary-container dark:text-cd-on-secondary-container dark:after:hover:bg-cd-on-secondary-container/[8%] dark:after:active:bg-cd-on-secondary-container/[12%]">
                <Icon :size="24" :FILL="1">{{ submenu.icon }}</Icon>
                <div class="text-left">{{ titleCase(submenu.title) }}</div>
              </button>
              <button v-else @click=";[$router.push('/' + submenus.name.toLowerCase() + '/' + submenu.name.toLowerCase()), useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]" class="overlay flex w-full flex-row items-center gap-4 rounded-full p-4 text-c-on-surface after:hover:bg-c-on-surface/[8%] after:active:bg-c-on-surface/[12%] dark:text-cd-on-surface dark:after:hover:bg-cd-on-surface/[8%] dark:after:active:bg-cd-on-surface/[12%]">
                <Icon :size="24">{{ submenu.icon }}</Icon>
                <div class="text-left">{{ titleCase(submenu.title) }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
