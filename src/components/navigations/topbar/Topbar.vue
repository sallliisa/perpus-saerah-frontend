<script setup lang="ts">
import TopbarActions from './layouts/TopbarActions.vue'
import TopbarNavigations from './layouts/TopbarNavigations.vue'
</script>

<template>
  <div class="sticky top-0 z-10 flex flex-col items-center justify-center bg-c-surface-container px-8 py-4 text-c-on-primary dark:bg-cd-surface-container dark:text-cd-on-surface">
    <div class="flex w-full max-w-[1536px] flex-col gap-4">
      <TopbarActions />
    </div>
  </div>
</template>
