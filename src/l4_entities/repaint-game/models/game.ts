import {Color} from "@/l4_entities/repaint-game/models/color";
import {Cell} from "@/l4_entities/repaint-game/models/cell";

export type Game = {
    gameId: string,
    user: {
        userId: string
    },
    palettes: {
        palettesId: number,
        palette: Color[],
        createdUserId: string
    },
    map: Cell[][],
    isWin: boolean,
    startTime: Date,
    end: boolean
}

export type NonRatingGame = Game & {maxRounds: number}

export type RatingGame = Game & {rating: number}