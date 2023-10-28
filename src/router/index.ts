import { createRouter, createWebHashHistory } from 'vue-router'
import Root from '../views/Root.vue'
import menu from '../menu'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import type { Module, RouteSeparator } from '@/types'
import { defineAsyncComponent, nextTick, watch } from 'vue'
import { getLocalStorage } from '@/utils/browser'
import { promiseHandler } from '@/stores/promisehandler'
import { globalLoading } from '@/stores/loading'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/unauthenticated/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/storefront/storefront',
      name: 'storefront',
      component: () => import('@/views/storefront/storefront.vue'),
    },
    {
      path: '/',
      name: 'root',
      component: Root,
    },
  ],
})

for (const module of menu as any) {
  for (const submodule of module.routes) {
    if (!submodule.separator) {
      if (submodule.children) {
        const children = (submodule.children as Array<Module>).map((child) => {
          return {
            path: '/' + module.name.toLowerCase() + '/' + submodule.name.toLowerCase() + '/' + child.name.toLowerCase(),
            name: child.name,
            component: () => import(`@/views/${module.name}/${submodule.name}/children/${child.name}.vue`),
            meta: { title: child.title, ...child.meta },
          }
        })
        router.addRoute({
          path: '/' + module.name.toLowerCase() + '/' + submodule.name.toLowerCase(),
          name: submodule.name,
          component: () => import(`@/views/${module.name}/${submodule.name}/${submodule.name}.vue`),
          meta: { title: submodule.title, ...submodule.meta, children: submodule.children ? submodule.children : null },
          children: children,
        })
      } else {
        router.addRoute({
          path: '/' + module.name.toLowerCase() + '/' + submodule.name.toLowerCase(),
          name: submodule.name,
          component: () => import(`@/views/${module.name}/${submodule.name}/${submodule.name}.vue`),
          meta: { title: submodule.title, ...submodule.meta, pages: submodule.routes ? submodule.routes : null },
        })
      }
      // if (submodule.routes) {
      //   for (const subsubmodule of submodule.routes) {
      //     console.log('adding routes to ', '/' + module.name.toLowerCase() + '/' + submodule.name.toLowerCase() + '/' + subsubmodule.name.toLowerCase())
      //     router.addRoute({
      //       path: '/' + module.name.toLowerCase() + '/' + submodule.name.toLowerCase() + '/' + subsubmodule.name.toLowerCase(),
      //       name: subsubmodule.name,
      //       component: () => import(`@/views/${module.name}/${submodule.name}/layouts/${subsubmodule.name}.vue`),
      //       meta: { title: subsubmodule.title, ...subsubmodule.meta },
      //     })
      //   }
      // }
    }
  }
}

router.beforeEach((to, from, next) => {
  nextTick(() => {
    console.log(to, from)
    if (to.name == 'login' || to.name == 'storefront') {
      console.log('router', 1, to.name)
      next()
      return
    }
    if (to.name == 'root') {
      console.log('router', 2)
      if (!localStorage.getItem('_token')) next({name: 'login'})
      else next({ name: getLocalStorage('modules')[0].routes.find((x: any) => !x.separator).name })
      return
    }
    if (from.name != to.name && from.name != 'login' && to.name != 'login') {
      console.log('router', 3)
      globalLoading().enable((to.query as any)['loadkey'])
    }
    if (localStorage.getItem('_token') !== undefined || localStorage.getItem('_token') !== null) {
      console.log('router', 4)
      const restricted = ['sso-login-apps', 'login', 'forgot-password', 'privacy-policy', 'term-condition', 'register-apps', 'verify-apps', 'waiting-apps', 'reset-apps']
      if (!restricted.includes(to.name as string) && (localStorage.getItem('_token') === undefined || localStorage.getItem('_token') == null)) {
        console.log('router', 5, to.name)
        if (to.name != 'login') {
          console.log('router', 6)
          next({ name: 'login' })
        } 
      } else {
        console.log('router', 7)
        next()
      }
    } else if (to.name != 'login') {
      console.log('router', 8)
      next({ name: 'login' })
    }
  })
})

router.afterEach((to, from) => {
  nextTick(() => {
    const destroyWatcher = watch(promiseHandler().value, () => {
      setTimeout(() => {
        if (!promiseHandler().value.length) {
          destroyWatcher()
          nextTick(() => {
            globalLoading().disable()
          })
        }
      }, 500)
      if (promiseHandler().value.length) {
        const destroyWatcher2 = watch(promiseHandler().value, () => {
          if (!promiseHandler().value.length) {
            destroyWatcher2()
            destroyWatcher()
            nextTick(() => {
            globalLoading().disable()
            })
          }
        })
      }
    }, {immediate: true})
  })
})

export default router
