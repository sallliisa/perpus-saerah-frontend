<script setup lang="ts">
import { Card } from '@/components/base/index'
import type { PropType } from 'vue'
import { useColorPreference } from '@/stores/colorpreference'

const props = defineProps({
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success' | 'surface-lowest' | 'surface-low' | 'surface' | 'surface-high' | 'surface-highest'>,
    required: false,
    default: 'surface',
  },
})
</script>

<template>
  <Card :color="props.color" :class="useColorPreference().isDark() ? 'color-breathe-dark' : 'color-breathe-light'"></Card>
</template>

<style scoped>
.color-breathe-dark {
  animation: 1s infinite alternate ease-out breathing-color-dark;
}

.color-breathe-light {
  animation: 1s infinite alternate ease-out breathing-color-light;
}

@keyframes breathing-color-dark {
  from {
    filter: brightness(100%);
  }
  to {
    filter: brightness(120%);
  }
}

@keyframes breathing-color-light {
  from {
    filter: brightness(100%);
  }
  to {
    filter: brightness(92%);
  }
}
</style>
