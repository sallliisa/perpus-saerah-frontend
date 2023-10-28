import services from "@/utils/services"
import { parseURL } from "./common"

export async function defaultGetData(getAPI: string, getQueryParameters: object) {
    const {data: {data}} = await services.get(parseURL(getAPI, '', '/lookup'), getQueryParameters)
    return data
}