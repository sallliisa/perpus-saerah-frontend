import { defineStore } from 'pinia'
import menu from '@/menu'
import { hasPermission, getCRUDPermissions } from '@/utils/auth'
import type { Module } from '@/types'

const value: Array<Module> = []

if (localStorage.getItem('modules')) {
  const modules = JSON.parse(localStorage.getItem('modules') || '')
  if (modules) {
    value.push(...modules)
  }
}

export const modules = defineStore('modules', () => {
  function buildModules() {
    menu.forEach((item) => {
      if (item.routes.length > 1) {
        const routes = (item.routes as any).filter((route: any) => {
          if (route.name) {
            return hasPermission(`view-${route.permission || route.name}`)
          } else if (route.separator) {
            return true
          }
        })
        while (routes.length > 0 && routes[routes.length - 1].separator) routes.pop()
        for (let i = 0; i < routes.length - 1; i++) {
          if (routes[i].separator && routes[i + 1].separator) {
            routes.splice(i, 1)
            i--
          }
        }
        if (routes.length != 0) value.push({ ...item, routes })
      } else {
        return hasPermission(`view-${item.permission || item.name}`) ? value.push(item) : null
      }
    })
    localStorage.setItem('modules', JSON.stringify(value))
  }
  function clearModules() {
    value.splice(0, value.length)
  }
  function rebuildModules() {
    clearModules()
    buildModules()
  }
  return { value, buildModules, clearModules, rebuildModules }
})
