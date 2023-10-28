import axios, { type AxiosResponse } from 'axios'
import config from '@/config'
import mode from '@/mode'
import router from '../router'
import { modules } from '@/stores/modules'
import { toast } from '@/stores/toast'
import qs from 'qs'
import type { QueryParameters } from '@/types/index'
import { promiseHandler } from '@/stores/promisehandler'

const api = axios.create({
  paramsSerializer: {
    serialize: (p: any) => qs.stringify(p, { serializeDate: (d: any) => d.toLocaleDateString('en-CA') }),
  },
  baseURL: config.server[mode],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

function signOut() {
  let colorPreference = localStorage.getItem('colorpreference')
  localStorage.clear()
  if (colorPreference) {
    localStorage.setItem('colorpreference', colorPreference)
  }
  modules().clearModules()
  router.push({ name: 'login' })
}

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('_token')
    if (token) {
      token =  JSON.parse(token)
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    toast().setError(error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) toast().setError('No response from server')
    else if (error.response?.status === 401) signOut()
    toast().setError(error.response?.data.error_message)
    return Promise.reject(error)
  }
)

const services = {
  signOut,
  raw(method: string, endPoint: string, data: Object) {
    const promise = (api as any)
      [method](`${endPoint}`, data)
      .then(function (response: AxiosResponse) {
        return response.data
      })
      .catch((err: any) => {
        throw err.response
      })
    promiseHandler().introduce(promise)
    return promise
  },
  downloadFile(endPoint: string, defaultFilename: string, param?: QueryParameters) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    const promise = axios({
      method: 'get',
      url: endPoint.includes(config.server[mode]) ? endPoint : `${config.server[mode] + '/' + endPoint}`,
      responseType: 'blob',
      params: param,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('_token') || ''),
      },
    })
      .then((response) => {
        const filename = response.headers['content-disposition']?.split('filename=') ? response.headers['content-disposition']?.split('filename=')[1] : defaultFilename
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type, endings: 'native' })
        const link = document.createElement('a')
        link.target = '_parent'
        link.href = window.URL.createObjectURL(blob)
        link.download = filename
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      })
      .catch((err) => {
        throw err.response
      })
      promiseHandler().introduce(promise)
      return promise
  },
  post(endPoint: string, data: Object) {
    const promise = api
      .post(`${endPoint}`, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  put(endPoint: string, data: Object) {
    const promise = api
      .put(`${endPoint}`, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  patch(endPoint: string, data: Object) {
    const promise = api
      .patch(`${endPoint}`, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  get(endPoint: string, param?: QueryParameters) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    const promise = api
      .get(`${endPoint}`, { params: param })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  list(endPoint: string, param?: QueryParameters) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    const promise = api
      .get(`${endPoint}/list`, { params: param })
      .then((response) => {
        return response.data.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  dataset(endPoint: string, param?: QueryParameters) {
    if (param && param.filters) {
      Object.assign(param, param.filters)
      delete param.filters
    }
    const promise = api
      .get(`${endPoint}/lookup`, { params: param })
      .then((response) => {
        return response.data.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  single(endPoint: string, id: number | string | any, param?: QueryParameters) {
    console.log('sngle')
    const promise = api
      .get(`${endPoint}/show/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  create(endPoint: string, data: Object, param?: QueryParameters) {
    const promise = api
      .post(`${endPoint}/create`, data, { params: param })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  update(endPoint: string, data: Object, param?: QueryParameters) {
    const promise = api
      .patch(`${endPoint}/update`, data, { params: param })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  delete(endPoint: string, id: Object) {
    const promise = api
      .delete(`${endPoint}/delete/${id}`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        throw err.response?.data.error_message || err
      })
    promiseHandler().introduce(promise)
    return promise
  },
  progress(method: string, endPoint: string, param: QueryParameters, onUploadProgress: Function) {
    return (api as any)[method](endPoint, param, {
      onUploadProgress,
    })
  },
  fileUpload(file: Blob, onUploadProgress: Function) {
    const formData = new FormData()
    formData.append('file', file)
    const promise = api.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      //@ts-ignore
      onUploadProgress,
    })
    promiseHandler().introduce(promise)
    return promise
  },
}

export default services
