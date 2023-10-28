<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getLocalStorage } from '@/utils/browser'

useRouter().push({ name: getLocalStorage('modules')[0].routes.find((x: any) => !x.separator).name })
</script>
