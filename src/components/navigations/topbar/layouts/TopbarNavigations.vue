<script setup lang="ts">
import { modules } from '@/stores/modules'
import { useSidebarStore } from '@/stores/sidebar'
import { useScreenStore } from '@/stores/screen'
import { useRouter } from 'vue-router'
import { Popover } from '@/components/base';

const router = useRouter()

const handleNavbarItemClick = (item: any, index: number) => {
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
    if (item.routes?.length == 1) {
      router.push('/' + item.name.toLowerCase() + '/' + (item.routes[0] as any).name.toLowerCase())
      useSidebarStore().setOpen(false)
      useSidebarStore().toggleVisibility()
    } else {
      useSidebarStore().setOpen(true)
    }
  }
}
</script>

<template>
  <div class="sticky top-0 z-10 flex flex-row items-center gap-8">
    <div v-for="(item, index) in modules().value" class="group relative flex h-max flex-col">
      <Button v-if="item.routes.length <= 1" :variant="$route.fullPath.split('/')[1] == item.name ? 'filled' : 'icon'" @click="() => $router.push({name: (item.routes[0] as any).name})">
        <div>{{ item.title }}</div>
      </Button>
      <Popover v-else>
        <template #trigger>
          <Button :variant="$route.fullPath.split('/')[1] == item.name ? 'filled' : 'icon'">
            <div>{{ item.title }}</div>
            <Icon size="16">expand_more</Icon>
          </Button>
        </template>
        <template #content="{setOpen}">
          <Card color="surface-high" class="mt-4">
            <template v-for="route in item.routes">
              <div v-if="(route as any).separator" class="text-muted">{{ (route as any).separator }}</div>
              <Button v-else class="min-w-max" :variant="$route.fullPath.split('/')[2].split('?')[0] == (route as any).name ? 'filled' : 'icon'" @click="() => $router.push({name: (route as any).name})"><div class="text-start w-full">{{ (route as any).title }}</div></Button>
            </template>
          </Card>
        </template>
      </Popover>
    </div>
  </div>
</template>
