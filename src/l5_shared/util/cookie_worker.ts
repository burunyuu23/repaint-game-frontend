import {BearerToken} from "@/l4_entities/user/models/bearerToken";
import Cookie from "js-cookie";

export const cookie_set_token = (token: BearerToken) => {
    Cookie.set('access_token', JSON.stringify(token.access_token), {expires: token.expires_in * 1000})
    Cookie.set('refresh_token', JSON.stringify(token.refresh_token), {expires: token.refresh_expires_in * 1000})
}
export const cookie_get_access_token = () => {
    return Cookie.get('access_token')
}
export const cookie_get_refresh_token = () => {
    return Cookie.get('refresh_token')
}