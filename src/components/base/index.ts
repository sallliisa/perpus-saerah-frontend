import { defineAsyncComponent } from 'vue'

const Alert = defineAsyncComponent(() => import('./Alert.vue'))
const Button = defineAsyncComponent(() => import('./Button.vue'))
const ButtonIcon = defineAsyncComponent(() => import('./ButtonIcon.vue'))
const Card = defineAsyncComponent(() => import('./Card.vue'))
const Chip = defineAsyncComponent(() => import('./Chip.vue'))
const Disclosure = defineAsyncComponent(() => import('./Disclosure.vue'))
const FileComponent = defineAsyncComponent(() => import('./FileComponent.vue'))
const ImagePreview = defineAsyncComponent(() => import('./ImagePreview.vue'))
const MapView = defineAsyncComponent(() => import('./MapView.vue'))
const Menu = defineAsyncComponent(() => import('./Menu.vue'))
const Modal = defineAsyncComponent(() => import('./Modal.vue'))
const Popover = defineAsyncComponent(() => import('./Popover.vue'))
const Skeleton = defineAsyncComponent(() => import('./Skeleton.vue'))
const Spinner = defineAsyncComponent(() => import('./Spinner.vue'))
const Timeline = defineAsyncComponent(() => import('./Timeline.vue'))
const Toast = defineAsyncComponent(() => import('./Toast.vue'))
const Tabs = defineAsyncComponent(() => import('./Tabs.vue'))
const Tree = defineAsyncComponent(() => import('./Tree/Tree.vue'))

export { Alert, Button, ButtonIcon, Card, Chip, Disclosure, FileComponent, ImagePreview, MapView, Menu, Modal, Popover, Skeleton, Spinner, Timeline, Toast, Tabs, Tree }
