<script setup lang="ts">
import Sidebar from '@/components/navigations/sidebar/rail/Sidebar.vue';
import Topbar from '@/components/navigations/topbar/Topbar.vue';
import app from '@/config';
import { useScreenStore } from '@/stores/screen';
import {useRouter} from 'vue-router'
import NavigationDrawer from '@/components/navigations/sidebar/drawer/NavigationDrawer.vue';
import { useSidebarStore } from '@/stores/sidebar';

const router = useRouter()
if (!localStorage.getItem('_token')) {
  router.push({name: 'login'})
}
</script>

<template>
  <div class="flex w-screen" :class="app.layout === 'SIDEBAR' || !useScreenStore().isAtLeast('lg') ? 'flex-row' : 'flex-col'">
    <template v-if="useScreenStore().isAtLeast('lg')">
      <Sidebar v-if="app.layout === 'SIDEBAR'"/>
      <Topbar v-else/>
    </template>
    <NavigationDrawer v-else/>
    <div class="z-0 flex min-h-screen w-full flex-col items-center gap-8 bg-c-surface p-8 text-c-on-surface dark:bg-cd-surface dark:text-cd-on-surface">
      <div v-if="!useScreenStore().isAtLeast('lg')" class="sticky top-0 z-50 flex w-full flex-row justify-between bg-c-surface py-4 dark:bg-cd-surface">
        <button @click=";[useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]"><Icon>menu</Icon></button>
        <Logo class="w-12"></Logo>
      </div>
      <main class="max-w-screen-2xl w-full grid grid-cols-1 gap-8">
        <slot></slot>
      </main>
    </div>
  </div>
</template>