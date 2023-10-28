<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { titleCase } from '@/utils/common'
import { useScreenStore } from '@/stores/screen'
import ProfileSegment from '../../layouts/ProfileSegment.vue'
import { modules } from '@/stores/modules'
import NavItem from './layouts/NavItem.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const currentView = ref<'modules' | 'routes' | 'profile'>('modules')

const sidebarexpand = ref<HTMLElement | null>(null)
onClickOutside(
  sidebarexpand,
  () => {
    useSidebarStore().setOpen(false)
    if (useScreenStore().isOrLess('lg') && useSidebarStore().visible) {
      useSidebarStore().toggleVisibility()
    }
    if (useSidebarStore().index == 999) {
      useSidebarStore().setIndex(-1)
    }
  },
  { ignore: ['#sidebar', '#dialog'] }
)
</script>

<template>
  <div v-if="$route.name != 'login'" ref="sidebarexpand" id="sidebar" class="fixed top-0 z-10 flex max-h-screen min-h-screen min-w-[288px] max-w-[288px] flex-col gap-8 rounded-r-2xl border-x border-c-surface-variant/[25%] bg-c-surface-container p-8 text-c-on-surface transition-all duration-[350ms] dark:border-cd-surface-variant/[25%] dark:bg-cd-surface-container dark:text-cd-on-surface" :class="useSidebarStore().visible ? 'left-0' : '-left-[288px]'">
    <Button variant="icon" square class="ml-2 w-fit" @click="useSidebarStore().toggleVisibility"><Icon>close</Icon></Button>
    <TransitionGroup mode="out-in" tag="div" name="viewmode" class="min-w-full overflow-scroll">
      <div v-if="currentView == 'modules'" class="flex flex-col gap-2">
        <NavItem v-for="(item, index) in modules().value" :route="item" :active="item.name == $route.fullPath.split('/')[1]" @click=";[useSidebarStore().setIndex(index), useSidebarStore().toggleOpen(), item.routes.length == 1 ? [$router.push('/' + item.name.toLowerCase() + '/' + item.name.toLowerCase()), useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()] : (currentView = 'routes')]" />
        <NavItem :active="useSidebarStore().index == 999" :route="{ icon: 'person', title: 'Profil' }" @click="currentView = 'profile'" />
      </div>
      <div v-else-if="currentView == 'routes'" class="flex flex-col gap-2" v-for="menu in [modules().value[useSidebarStore().index]]">
        <NavItem :active="false" :route="{ icon: 'arrow_back', title: 'Kembali' }" @click="currentView = 'modules'"></NavItem>
        <div v-for="(route, index) in modules().value[useSidebarStore().index].routes">
          <div v-if="(route as any).separator" class="text-muted px-4 py-2 text-sm">{{ (route as any).separator }}</div>
          <NavItem v-else :active="(route as any).name == $route.fullPath.split('/')[2]" :route="route" @click=";[$router.push('/' + menu.name.toLowerCase() + '/' + (route as any).name.toLowerCase()), useSidebarStore().toggleOpen(), useSidebarStore().toggleVisibility()]" />
        </div>
      </div>
      <div v-else-if="currentView == 'profile'" class="flex flex-col gap-2">
        <NavItem :active="false" :route="{ icon: 'arrow_back', title: 'Kembali' }" @click="currentView = 'modules'"></NavItem>
        <ProfileSegment />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.viewmode-enter-active,
.viewmode-leave-active {
  transition: all 0.1725s ease;
  position: absolute;
}

.viewmode-leave-to {
  opacity: 0;
  transform: v-bind('currentView == "modules" ? "translateX(-5%)" : "translateX(5%)"');
  min-width: 230px;
  position: absolute;
}
.viewmode-enter-from {
  opacity: 0;
  transform: v-bind('currentView == "modules" ? "translateX(5%)" : "translateX(-5%)"');
  min-width: 230px;
  position: absolute;
}

.viewmode-enter-to,
.viewmode-leave-from {
  opacity: 1;
  transform: translateX(0%);
  min-width: 230px;
  transition-delay: 0.1725s;
  position: absolute;
}
.viewmode-move {
  transition: all 0.17s ease;
  position: absolute;
}
</style>
