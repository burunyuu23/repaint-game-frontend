import {CreateUserResponseDTO} from "@/l4_entities/user/dtos/responses/createUserResponseDTO";
import api from "@/l5_shared/api/axios";
import {LoginRequestDTO} from "@/l4_entities/user/dtos/requests/loginRequestDTO";
import {LoginResponseDTO} from "@/l4_entities/user/dtos/responses/loginResponseDTO";
import {loginUrl, refreshUrl} from "@/l5_shared/api/keycloak/auth";
import {RefreshTokenResponseDTO} from "@/l4_entities/user/dtos/responses/refreshTokenResponseDTO";
import {RefreshTokenRequestDTO} from "@/l4_entities/user/dtos/requests/refreshTokenRequestDTO";
import {cookie_get_refresh_token} from "@/l5_shared/util/cookie_worker";

export class AuthService {
    static login = async (loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> => {
        const response: CreateUserResponseDTO = await api.post(`${loginUrl}`, loginRequestDTO)
            .then(resp => resp.data)
        return response;
    }

    static refreshToken = async (refreshTokenRequestDTO: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> => {
        const response: RefreshTokenResponseDTO = await api.post(`${refreshUrl}`, refreshTokenRequestDTO)
            .then(resp => resp.data)
        return response;
    }
}