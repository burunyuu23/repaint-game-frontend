import {BearerToken} from "@/l4_entities/user/models/bearerToken";
import Cookie from "js-cookie";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {AuthService} from "@/l4_entities/user/auth-service/service";
import {AppDispatch} from "@/l3_features/redux/store";

export const cookie_set_token = (token: BearerToken) => {
    const now = new Date()
    const time = now.getTime();

    Cookie.set('access_token', JSON.stringify(token.access_token), {expires: new Date(time + token.expires_in*1000)})
    Cookie.set('refresh_token', JSON.stringify(token.refresh_token), {expires: new Date(time + token.refresh_expires_in*1000)})
}
export const cookie_get_access_token = () => {
    const access_token = Cookie.get('access_token');
    if (access_token)
        return JSON.parse(access_token)
    else
        return access_token
}
export const cookie_get_refresh_token = () => {
    const refresh_token = Cookie.get('refresh_token');
    if (refresh_token)
        return JSON.parse(refresh_token)
    else
        return refresh_token
}

export const cookie_token_clear = () => {
    Cookie.remove("access_token")
    Cookie.remove("refresh_token")
}

export const get_is_token_active = () => {
    if (cookie_get_access_token()) {
        return true
    }
    else {
        const refresh_token = cookie_get_refresh_token()
        if (refresh_token) {
            AuthService.refreshToken({refresh_token})
                .then(resp => cookie_set_token(resp))
                .catch(e => {
                    cookie_token_clear()
                    return false
                })
            return true
        }
    }
    return false
}