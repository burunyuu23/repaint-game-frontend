import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import {GameStartRequestDTO} from "@/l4_entities/repaint-game/dtos/requests/gameStartRequestDTO";
import {startUrl, stepUrl, userGamesUrl} from "@/l5_shared/api/repaint_game/nonRatingGame";
import api from "@/l5_shared/api/axios";
import {GameStepRequestDTO} from "@/l4_entities/repaint-game/dtos/requests/gameStepRequestDTO";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import {cookie_get_access_token} from "@/l5_shared/util/cookie_worker";
import {Page, RequestParam} from "@/l5_shared/types/requestParam";
import {NonRatingGame} from "@/l4_entities/repaint-game/models/game";
import {request_params_create} from "@/l5_shared/util/request_params_creater";

export class NonRatingAuthService {

    static startGame = async (gameStartRequestDTO: GameStartRequestDTO): Promise<GameStartResponseDTO> => {
        const jwt = cookie_get_access_token()
        const response: GameStartResponseDTO = await api.post(`${startUrl}`, gameStartRequestDTO, {
            headers: {
                "Authorization": "Bearer " + jwt
            }
        })
            .then(resp => resp.data)
        return response;
    }

    static stepGame = async (gameStepRequestDTO: GameStepRequestDTO): Promise<GameStepResponseDTO> => {

        const jwt = cookie_get_access_token()
        const response: GameStepResponseDTO = await api.post(`${stepUrl}`, gameStepRequestDTO, {
            headers: {
                "Authorization": "Bearer " + jwt
            }
        })
            .then(resp => resp.data)
        return response;
    }

    static userGames = async (requestParam: RequestParam, userId: string): Promise<Page<NonRatingGame>> => {
        const response: Page<NonRatingGame> = await api.get(`${userGamesUrl(userId)}?${request_params_create(requestParam)}`)
            .then(resp => resp.data)
        return response;
    }
}