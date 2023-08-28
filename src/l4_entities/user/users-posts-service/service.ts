import api from "@/l5_shared/api/axios";
import {cookie_get_access_token} from "@/l5_shared/util/cookie_worker";
import {profileUrl, userUrl} from "@/l5_shared/api/users_posts/users";
import {UserProfile} from "@/l4_entities/user/models/user";

export class UsersPostsService {
    static profile = async (): Promise<UserProfile> => {
        const jwt = cookie_get_access_token()
        const response = await api.get(profileUrl, {
            headers: {
                "Authorization": "Bearer " + jwt
            }
        })
            .then(resp => resp.data)
        return response;
    }

    static userByUsername = async (username: string): Promise<UserProfile> => {
        const response = await api.get(userUrl(username))
            .then(resp => resp.data)
        return response;
    }
}