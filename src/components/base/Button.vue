<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  variant: {
    type: String as PropType<'filled' | 'outlined' | 'tonal' | 'icon'>,
    required: false,
    default: 'filled',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success'>,
    required: false,
  },
  square: {
    type: Boolean,
    required: false,
    default: false,
  },
  small: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    required: false,
    default: 'button',
  },
})

const variantsDefault: { [key: string]: 'primary' | 'secondary' } = {
  filled: 'primary',
  outlined: 'primary',
  tonal: 'secondary',
  text: 'primary',
  icon: 'primary',
}

const btnColor = ref<'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'info' | 'success'>(props.color ? props.color : variantsDefault[props.variant])

const colorMap = {
  filled: {
    base: 'inline-flex items-center justify-center gap-2 text-white disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%]',
    primary: 'bg-c-primary after:bg-c-on-primary/[8%] dark:after:bg-cd-on-primary/[8%] dark:bg-cd-primary text-c-on-primary dark:text-cd-on-primary',
    secondary: 'bg-c-secondary after:bg-c-on-secondary/[8%] dark:after:bg-cd-on-secondary/[8%] dark:bg-cd-secondary text-c-on-secondary dark:text-cd-on-secondary',
    tertiary: 'bg-c-tertiary after:bg-c-on-tertiary/[8%] dark:after:bg-cd-on-tertiary/[8%] dark:bg-cd-tertiary text-c-on-tertiary dark:text-cd-on-tertiary',
    warning: 'bg-c-warning after:bg-c-on-warning/[8%] dark:after:bg-cd-on-warning/[8%] dark:bg-cd-warning text-c-on-warning dark:text-cd-on-warning',
    error: 'bg-c-error after:bg-c-on-error/[8%] dark:after:bg-cd-on-error/[8%] dark:bg-cd-error text-c-on-error dark:text-cd-on-error',
    info: 'bg-c-info after:bg-c-on-info/[8%] dark:after:bg-cd-on-info/[8%] dark:bg-cd-info text-c-on-info dark:text-cd-on-info',
    success: 'bg-c-success after:bg-c-on-success/[8%] dark:after:bg-cd-on-success/[8%] dark:bg-cd-success text-c-on-success dark:text-cd-on-success',
  },
  tonal: {
    base: 'disabled:text-c-black-light dark:text-cd-white-text inline-flex cursor-pointer justify-center gap-2 focus:outline-none disabled:cursor-default disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%]',
    primary: 'bg-c-primary-container after:hover:bg-c-on-primary-container/[8%] dark:after:hover:bg-cd-on-primary-container/[8%] after:active:bg-c-on-primary-container/[12%] dark:after:active:bg-cd-on-primary-container/[12%] dark:bg-cd-primary-container text-c-on-primary-container dark:text-cd-on-primary-container',
    secondary: 'bg-c-secondary-container after:hover:bg-c-on-secondary-container/[8%] dark:after:hover:bg-cd-on-secondary-container/[8%] after:active:bg-c-on-secondary-container/[12%] dark:after:active:bg-cd-on-secondary-container/[12%] dark:bg-cd-secondary-container text-c-on-secondary-container dark:text-cd-on-secondary-container',
    tertiary: 'bg-c-tertiary-container after:hover:bg-c-on-tertiary-container/[8%] dark:after:hover:bg-cd-on-tertiary-container/[8%] after:active:bg-c-on-tertiary-container/[12%] dark:after:active:bg-cd-on-tertiary-container/[12%] dark:bg-cd-tertiary-container text-c-on-tertiary-container dark:text-cd-on-tertiary-container',
    info: 'bg-c-info-container after:hover:bg-c-on-info-container/[8%] dark:after:hover:bg-cd-on-info-container/[8%] after:active:bg-c-on-info-container/[12%] dark:after:active:bg-cd-on-info-container/[12%] dark:bg-cd-info-container text-c-on-info-container dark:text-cd-on-info-container',
    warning: 'bg-c-warning-container after:hover:bg-c-on-warning-container/[8%] dark:after:hover:bg-cd-on-warning-container/[8%] after:active:bg-c-on-warning-container/[12%] dark:after:active:bg-cd-on-warning-container/[12%] dark:bg-cd-warning-container text-c-on-warning-container dark:text-cd-on-warning-container',
    error: 'bg-c-error-container after:hover:bg-c-on-error-container/[8%] dark:after:hover:bg-cd-on-error-container/[8%] after:active:bg-c-on-error-container/[12%] dark:after:active:bg-cd-on-error-container/[12%] dark:bg-cd-error-container text-c-on-error-container dark:text-cd-on-error-container',
    success: 'bg-c-success-container after:hover:bg-c-on-success-container/[8%] dark:after:hover:bg-cd-on-success-container/[8%] after:active:bg-c-on-success-container/[12%] dark:after:active:bg-cd-on-success-container/[12%] dark:bg-cd-success-container text-c-on-success-container dark:text-cd-on-success-container',
  },
  outlined: {
    base: 'font-medium disabled:text-c-on-surface/[38%] dark:disabled:text-cd-on-surface/[38%] outline outline-1 disabled:outline-c-on-surface/[12%] dark:disabled:outline-cd-on-surface/[12%]',
    primary: 'after:hover:bg-c-on-primary-container/[8%] dark:after:hover:bg-cd-on-primary-container/[8%] outline-c-primary dark:outline-cd-primary after:active:bg-c-on-primary-container/[12%] dark:after:active:bg-cd-on-primary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-primary dark:text-cd-primary ',
    secondary: 'after:hover:bg-c-on-secondary-container/[8%] dark:after:hover:bg-cd-on-secondary-container/[8%] outline-c-secondary dark:outline-cd-secondary after:active:bg-c-on-secondary-container/[12%] dark:after:active:bg-cd-on-secondary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-secondary dark:text-cd-secondary ',
    tertiary: 'after:hover:bg-c-on-tertiary-container/[8%] dark:after:hover:bg-cd-on-tertiary-container/[8%] outline-c-tertiary dark:outline-cd-tertiary after:active:bg-c-on-tertiary-container/[12%] dark:after:active:bg-cd-on-tertiary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-tertiary dark:text-cd-tertiary ',
    info: 'after:hover:bg-c-on-info-container/[8%] dark:after:hover:bg-cd-on-info-container/[8%] outline-c-info dark:outline-cd-info after:active:bg-c-on-info-container/[12%] dark:after:active:bg-cd-on-info-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-info dark:text-cd-info ',
    warning: 'after:hover:bg-c-on-warning-container/[8%] dark:after:hover:bg-cd-on-warning-container/[8%] outline-c-warning dark:outline-cd-warning after:active:bg-c-on-warning-container/[12%] dark:after:active:bg-cd-on-warning-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-warning dark:text-cd-warning ',
    error: 'after:hover:bg-c-on-error-container/[8%] dark:after:hover:bg-cd-on-error-container/[8%] outline-c-error dark:outline-cd-error after:active:bg-c-on-error-container/[12%] dark:after:active:bg-cd-on-error-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-error dark:text-cd-error ',
    success: 'after:hover:bg-c-on-success-container/[8%] dark:after:hover:bg-cd-on-success-container/[8%] outline-c-success dark:outline-cd-success after:active:bg-c-on-success-container/[12%] dark:after:active:bg-cd-on-success-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-success dark:text-cd-success ',
  },
  text: {
    base: 'font-medium disabled:text-c-on-surface/[38%] dark:disabled:text-cd-on-surface/[38%]',
    primary: 'after:hover:bg-c-on-primary-container/[8%] dark:after:hover:bg-cd-on-primary-container/[8%] after:active:bg-c-on-primary-container/[12%] dark:after:active:bg-cd-on-primary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-primary dark:text-cd-primary',
    secondary: 'after:hover:bg-c-on-secondary-container/[8%] dark:after:hover:bg-cd-on-secondary-container/[8%] after:active:bg-c-on-secondary-container/[12%] dark:after:active:bg-cd-on-secondary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-secondary dark:text-cd-secondary',
    tertiary: 'after:hover:bg-c-on-tertiary-container/[8%] dark:after:hover:bg-cd-on-tertiary-container/[8%] after:active:bg-c-on-tertiary-container/[12%] dark:after:active:bg-cd-on-tertiary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-tertiary dark:text-cd-tertiary',
    info: 'after:hover:bg-c-on-info-container/[8%] dark:after:hover:bg-cd-on-info-container/[8%] after:active:bg-c-on-info-container/[12%] dark:after:active:bg-cd-on-info-container/[12%] text-c-info dark:text-cd-info',
    warning: 'after:hover:bg-c-on-warning-container/[8%] dark:after:hover:bg-cd-on-warning-container/[8%] after:active:bg-c-on-warning-container/[12%] dark:after:active:bg-cd-on-warning-container/[12%] text-c-warning dark:text-cd-warning',
    error: 'after:hover:bg-c-on-error-container/[8%] dark:after:hover:bg-cd-on-error-container/[8%] after:active:bg-c-on-error-container/[12%] dark:after:active:bg-cd-on-error-container/[12%] text-c-error dark:text-cd-error',
    success: 'after:hover:bg-c-on-success-container/[8%] dark:after:hover:bg-cd-on-success-container/[8%] after:active:bg-c-on-success-container/[12%] dark:after:active:bg-cd-on-success-container/[12%] text-c-success dark:text-cd-success',
  },
  icon: {
    base: 'disabled:text-c-black-light dark:text-cd-white-text inline-flex cursor-pointer justify-center gap-2 focus:outline-none disabled:cursor-default disabled:text-c-on-surface/[38%] dark:disabled:text-cd-on-surface/[38%]',
    primary: 'after:hover:bg-c-on-primary-container/[8%] dark:after:hover:bg-cd-on-primary-container/[8%] after:active:bg-c-on-primary-container/[12%] dark:after:active:bg-cd-on-primary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-primary dark:text-cd-primary',
    secondary: 'after:hover:bg-c-on-secondary-container/[8%] dark:after:hover:bg-cd-on-secondary-container/[8%] after:active:bg-c-on-secondary-container/[12%] dark:after:active:bg-cd-on-secondary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-secondary dark:text-cd-secondary',
    tertiary: 'after:hover:bg-c-on-tertiary-container/[8%] dark:after:hover:bg-cd-on-tertiary-container/[8%] after:active:bg-c-on-tertiary-container/[12%] dark:after:active:bg-cd-on-tertiary-container/[12%] disabled:bg-c-on-surface/[12%] disabled:text-c-on-surface/[38%] dark:disabled:bg-cd-on-surface/[12%] dark:disabled:text-cd-on-surface/[38%] text-c-tertiary dark:text-cd-tertiary',
    info: 'after:hover:bg-c-on-info-container/[8%] dark:after:hover:bg-cd-on-info-container/[8%] after:active:bg-c-on-info-container/[12%] dark:after:active:bg-cd-on-info-container/[12%] text-c-info dark:text-cd-info',
    warning: 'after:hover:bg-c-on-warning-container/[8%] dark:after:hover:bg-cd-on-warning-container/[8%] after:active:bg-c-on-warning-container/[12%] dark:after:active:bg-cd-on-warning-container/[12%] text-c-warning dark:text-cd-warning',
    error: 'after:hover:bg-c-on-error-container/[8%] dark:after:hover:bg-cd-on-error-container/[8%] after:active:bg-c-on-error-container/[12%] dark:after:active:bg-cd-on-error-container/[12%] text-c-error dark:text-cd-error',
    success: 'after:hover:bg-c-on-success-container/[8%] dark:after:hover:bg-cd-on-success-container/[8%] after:active:bg-c-on-success-container/[12%] dark:after:active:bg-cd-on-success-container/[12%] text-c-success dark:text-cd-success',
  },
}

const paddingMap = {
  square: `aspect-square ${props.small ? 'p-1' : 'p-2'}`,
  long: 'px-6 py-2',
}
</script>
<template>
  <button class="overlay flex items-center justify-center rounded-full disabled:pointer-events-none" :type="props.type" :disabled="props.disabled" :class="`${twMerge(colorMap[props.variant][btnColor], $attrs.class as string)} ${props.square ? paddingMap.square : paddingMap.long} ${colorMap[props.variant].base} ${props.small ? '' : 'h-10'}`">
    <slot></slot>
  </button>
</template>
