import {RequestParam} from "@/l5_shared/types/requestParam";

export const request_params_create = (requestParam: RequestParam) => {
    return `${requestParam.limit ? `limit=${requestParam.limit}` : ''}
    ${requestParam.offset ? `&offset=${requestParam.offset}` : ''}
    ${requestParam.sort ? `&sort=${requestParam.sort}` : ''}`
}