import { toast } from "@/stores/toast";
import services from "@/utils/services";
import { parseURL } from "./common";

export function defaultBeforeSubmit(formData: object) {
  return formData;
}

export async function defaultOnSubmit(payload: object, targetAPI: string, type: 'create' | 'update', postQueryParameters?: object): Promise<object> {
  try {
    let res
    console.log('TYPE IS', type, 'SENDING', payload, 'TO', targetAPI)
    if (type === 'create') res = await services.post(parseURL(targetAPI, '', '/create'), {...payload, ...postQueryParameters})
    else if (type === 'update') res = await services.patch(parseURL(targetAPI, '', '/update'), {...payload, ...postQueryParameters})
    else throw new Error('type harus create atau update')
    return res
  }
  catch (err: any) {
    throw new Error(err)
  }
}

export function defaultOnSuccess(payload: object, response: object) {
  return {payload, response};
}

export function defaultOnError(payload: object, error: any) {
  toast().setError(`${error.data?.message || error}`)
  return {payload, error};
}

export async function defaultGetInitialData(showAPI: string, id: string | number, getQueryParameters?: object) {
  try {
    const {data} = await services.single(showAPI, id, getQueryParameters)
    return data
  } catch (error: any) {
    toast().setError(`Gagal mengambil data: ${error.data?.message || error}`)
  }
}