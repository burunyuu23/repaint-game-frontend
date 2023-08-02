import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {Color} from "@/l4_entities/repaint-game/models/color";

export type GameStartResponseDTO = {
    gameId: string,
    map: Cell[][],
    colors: Color[],
    maxRounds: number,
    fieldSize: number,
}