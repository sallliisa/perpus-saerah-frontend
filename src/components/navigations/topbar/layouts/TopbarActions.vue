<script setup lang="ts">
import Logo from '@/assets/corporate/common/Logo.vue'
import Wordmark from '@/assets/corporate/common/Wordmark.vue'
import { ImagePreview, Popover } from '@/components/base'
import ProfileSegment from '../../layouts/ProfileSegment.vue'
import TopbarNavigations from './TopbarNavigations.vue';
</script>

<template>
  <div class="flex h-16 flex-row items-center justify-between">
    <div class="flex flex-row items-center gap-4">
      <Logo color="white" class="w-12" />
      <Wordmark class="mt-2 max-h-12 max-w-[72px]" color="white" />
    </div>
    <div class="flex flex-row gap-4">
      <TopbarNavigations/>
      <Popover :ignore="['#user-profile-segment']">
        <template #trigger>
          <Button variant="tonal" square><Icon>person</Icon></Button>
        </template>
        <template #content>
          <Card color="surface-high" class="min-w-[256px] -translate-x-48">
            <ProfileSegment />
          </Card>
        </template>
      </Popover>
    </div>
  </div>
</template>
