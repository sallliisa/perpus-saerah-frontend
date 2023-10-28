<script setup lang="ts">
import { type PropType, defineAsyncComponent } from 'vue'
import { useColorPreference } from '@/stores/colorpreference'

const props = defineProps({
  color: {
    type: String as PropType<'white' | 'color'>,
    required: false,
    default: 'color',
  },
  strict: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const iconMap: any = {
  white: defineAsyncComponent(() => import('../assets/logo-white.vue')),
  color: defineAsyncComponent(() => import('../assets/logo-color.vue')),
}
</script>

<template>
  <div>
    <component :is="iconMap[props.strict ? props.color : useColorPreference().isDark() ? 'white' : props.color]" class="h-fit w-fit max-w-full" />
  </div>
</template>
