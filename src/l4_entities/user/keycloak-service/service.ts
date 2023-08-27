import api from "@/l5_shared/api/axios";
import {CreateUserRequestDTO} from "@/l4_entities/user/dtos/requests/createUserRequestDTO";
import {CreateUserResponseDTO} from "@/l4_entities/user/dtos/responses/createUserResponseDTO";
import {createUserUrl} from "@/l5_shared/api/keycloak/user";

export class KeycloakService {
    static createUser = async (createUserRequestDTO: CreateUserRequestDTO): Promise<CreateUserResponseDTO> => {
        const response: CreateUserResponseDTO = await api.post(`${createUserUrl}`, createUserRequestDTO)
            .then(resp => resp.data)
        return response;
    }
}