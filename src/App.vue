<script setup lang="ts">
import { RouterView } from 'vue-router'
import { globalLoading } from '@/stores/loading'
import Toast from '@/components/base/Toast.vue'
import { toast } from '@/stores/toast'
import { useSidebarStore } from '@/stores/sidebar'
import { useScreenStore } from '@/stores/screen'
import { debounce } from '@/utils/common'
import { onMounted, ref, onUnmounted, defineAsyncComponent, watch, computed } from 'vue'
import { useColorPreference } from './stores/colorpreference'
import { useRoute } from 'vue-router'
import ArbitraryClasses from './views/ArbitraryClasses.vue'
import app from './config'

const windowWidth = ref(0)
const windowHeight = ref(0)

function handleResize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  switch (true) {
    case windowWidth.value < 640:
      useSidebarStore().visible = false
      if (useSidebarStore().index == -1) useSidebarStore().index = 0
      useSidebarStore().setOpen(true)
      useScreenStore().set(0)
      break
    case windowWidth.value < 768:
      useSidebarStore().visible = false
      if (useSidebarStore().index == -1) useSidebarStore().index = 0
      useSidebarStore().setOpen(true)
      useScreenStore().set(1)
      break
    case windowWidth.value < 1024:
      useSidebarStore().visible = false
      if (useSidebarStore().index == -1) useSidebarStore().index = 0
      useSidebarStore().setOpen(false)
      useScreenStore().set(2)
      break
    case windowWidth.value < 1280:
      useScreenStore().set(3)
      break
    case windowWidth.value < 1536:
      useScreenStore().set(4)
      break
    default:
      useScreenStore().set(5)
      break
  }
}

onMounted(() => {
  window.addEventListener('resize', debounce(handleResize, 300))
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', debounce(handleResize, 300))
})

const layoutMap: any = {
  DEFAULT: defineAsyncComponent(() => import('@/layouts/Authenticated.vue')),
  unauthenticated: defineAsyncComponent(() => import('@/layouts/Unauthenticated.vue')),
}

const route = useRoute()

const currentLocation = computed(() => {
  const path = route.path.split('/')[1]
  return layoutMap[path] ?  path : 'DEFAULT'
})
</script>

<template>
  <html :class="useColorPreference().getCurrentValue()">
    <header>
      <title>{{ app.name }}</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100;200;300;400;500;600;700;800;900;1000&display=swap" rel="stylesheet" />
    </header>
    <body class="text-c-black-text dark:text-cd-white-text transition-colors">
      <div class="pointer-events-none fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-4 p-8">
        <transition-group name="toast">
          <Toast v-if="toast().message.length" v-for="message in toast().message" :type="(message as any).type">{{ (message as any).message }}</Toast>
        </transition-group>
      </div>
      <Suspense>
        <component :is="layoutMap[currentLocation]">
          <RouterView v-slot="{Component}">
            <template v-if="Component">
              <Suspense :timeout="0">
                <div>
                  <div class="flex ietms-center justify-center">
                    <Transition name="spinner">
                      <div class="absolute" v-if="globalLoading().isLoading()">
                        <Spinner/>
                      </div>
                    </Transition>
                  </div>
                  <Transition mode="out-in" name="route">
                    <component :class="globalLoading().isLoading() ? 'opacity-0' : 'opacity-100'" class="duration-200" :is="Component"/>
                  </Transition>
                </div>
                <template #fallback>
                  <Spinner/>
                </template>
              </Suspense>
            </template>
          </RouterView>
        </component>
      </Suspense>
      <ArbitraryClasses />
    </body>
  </html>
</template>

<style>
.spinner-enter-active {
  transition: opacity 100ms ease 1s;
}

.spinner-leave-active {
  transition: opacity 50ms ease;
}

.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s ease;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.15s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateY(0%);
}
.toast-leave-active:not(:first-child) {
  position: absolute;
}
.toast-move {
  transition: all 0.2s ease;
}
</style>
