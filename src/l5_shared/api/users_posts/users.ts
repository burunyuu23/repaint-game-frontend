import {usersPostsUrl} from "@/l5_shared/api/users_posts/users_posts";

const requestMapping = "/users"

const profileMapping = "/profile"


export const profileUrl = `${usersPostsUrl}${requestMapping}${profileMapping}`
export const userUrl = (username: string) => `${usersPostsUrl}${requestMapping}/${username}`