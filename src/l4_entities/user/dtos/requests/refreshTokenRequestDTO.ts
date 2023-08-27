import {BearerToken} from "@/l4_entities/user/models/bearerToken";

export type RefreshTokenRequestDTO = Pick<BearerToken, "refresh_token">