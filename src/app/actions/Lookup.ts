import services from "@/utils/services"
import { parseURL } from "./common"
import { immutableDefaults } from "./BaseCRUD"

export async function defaultGetData(getAPI: string, getQueryParameters: object) {
    const {data, total, totalPage} = await services.get(parseURL(getAPI, '', '/lookup'), getQueryParameters)
    return {data: data, dataInfo: {total, totalPage}}
}

export const defaultFieldsAlias = immutableDefaults.fieldsAlias

export async function onSaveData(postAPI: string, postData: object) {
    return null
}