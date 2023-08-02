import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import {GameStartRequestDTO} from "@/l4_entities/repaint-game/dtos/requests/gameStartRequestDTO";
import {startUrl, stepUrl} from "@/l5_shared/api/repaint_game/nonRatingNoAuthGame";
import api from "@/l5_shared/api/axios";
import {GameStepRequestDTO} from "@/l4_entities/repaint-game/dtos/requests/gameStepRequestDTO";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";

export class NonRatingNoAuthService {

    static startGame = async (gameStartRequestDTO: GameStartRequestDTO): Promise<GameStartResponseDTO> => {
        const response: GameStartResponseDTO = await api.post(`${startUrl}`, gameStartRequestDTO)
            .then(resp => resp.data)
        return response;
    }

    static stepGame = async (gameStepRequestDTO: GameStepRequestDTO): Promise<GameStepResponseDTO> => {

        const response: GameStepResponseDTO = await api.post(`${stepUrl}`, gameStepRequestDTO)
            .then(resp => resp.data)
        return response;
    }
}