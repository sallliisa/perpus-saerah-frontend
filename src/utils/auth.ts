import app from '@/config'
import { setLocalStorage, getLocalStorage } from './browser'

export function saveProfile(userData: any) {
  setLocalStorage('profile', userData.profile)
  setLocalStorage('_token', userData.token)
  setLocalStorage('permission', userData.permissions)
}

export function getCRUDPermissions(permission: string | undefined | null) {
  if (app.mode == 'EARLY_DEVELOPMENT' || JSON.parse(localStorage.getItem('profile') || '{}').role_id === -1)
    return {
      view: true,
      lookup: true,
      show: true,
      create: true,
      update: true,
      delete: true,
    }
  else {
    const permissions = getLocalStorage('permission')
    if (!permissions || !permission) {
      return {
        view: false,
        lookup: false,
        show: false,
        create: false,
        update: false,
        delete: false,
      }
    }
    const permissionId = permission.toLowerCase().replace(/_/g, '-')
    return {
      view: permissions.includes('view-' + permissionId),
      lookup: permissions.includes('lookup-' + permissionId),
      show: permissions.includes('show-' + permissionId),
      create: permissions.includes('create-' + permissionId),
      update: permissions.includes('update-' + permissionId),
      delete: permissions.includes('delete-' + permissionId),
    }
  }
}

export function hasPermission(permission: string | Array<string> | undefined | null) {
  if (app.mode == 'EARLY_DEVELOPMENT' || JSON.parse(localStorage.getItem('profile') || '{}').role_id === -1) return true
  else {
    const permissions = getLocalStorage('permission')
    if (!permissions || !permission) return false
    if (Array.isArray(permission)) {
      for (let i = 0; i < permission.length; i++) {
        if (!getLocalStorage('permission').includes(permission[i])) {
          return false
        }
      }
      return true
    } else return getLocalStorage('permission').includes(permission)
  }
}
