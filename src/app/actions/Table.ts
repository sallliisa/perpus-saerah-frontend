import services from "@/utils/services";
import { parseURL } from "./common";

export async function defaultGetData(getAPI: string, getQueryParameters: object) {
  const {data} = await services.get(parseURL(getAPI, '', '/list'), getQueryParameters)
  return {data: data, dataInfo: {total: data.total, totalPage: data.totalPage, length: data.length}, additionalData: data.additional_data}
}

export function defaultOnDataLoaded(data: object) {
  return 
}