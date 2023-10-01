import { NonRatingGame } from "../../models/game"

export type GamesHistoryResponseDTO = {
    game: NonRatingGame,
    finalRound: number,
    endTime: Date
}