<script setup lang="ts">
const props = defineProps({
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="flex flex-row gap-2 items-center cursor-default group/radio">
    <Icon class="group-hover/radio:brightness-150">{{ props.checked ? 'radio_button_checked' : 'radio_button_unchecked' }}</Icon>
    <label>
      <slot name="label">{{ props.description }}</slot>
    </label>
  </div>
</template>