import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";


export type GameStepResponseDTO = GameStartResponseDTO & {
    currentRound: number,
    end: boolean,
    stepTime: Date
}