import services from "@/utils/services";
import { parseURL } from "./common";

export async function defaultGetData(getAPI: string,  id: string | number, getQueryParameters: object) {
  const {data} = await services.get(parseURL(getAPI, '', `/show/${id}`), getQueryParameters)
  return data
}

export function defaultOnDataLoaded(data: object) {
  return 
}