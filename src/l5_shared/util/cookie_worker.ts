import {BearerToken} from "@/l4_entities/user/models/bearerToken";
import Cookie from "js-cookie";

export const cookie_set_token = (token: BearerToken) => {
    const now = new Date()
    const time = now.getTime();

    Cookie.set('access_token', JSON.stringify(token.access_token), {expires: new Date(time + token.expires_in*1000)})
    Cookie.set('refresh_token', JSON.stringify(token.refresh_token), {expires: new Date(time + token.refresh_expires_in*1000)})
}
export const cookie_get_access_token = () => {
    return Cookie.get('access_token')
}
export const cookie_get_refresh_token = () => {
    return Cookie.get('refresh_token')
}