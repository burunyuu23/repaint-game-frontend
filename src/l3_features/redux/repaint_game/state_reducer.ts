import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";

export type RepaintGameState = {
    startTime: number | null,
    endTime: number | null,
    prevMap: Cell[][] | null,
    prevCapturedCount: number | null,
    gameSettings: GameStepResponseDTO | null,
    isWin: boolean | null
}

export const initialState: RepaintGameState = {
    startTime: null,
    endTime: null,
    prevMap: null,
    prevCapturedCount: null,
    gameSettings: null,
    isWin: null
}

export const RepaintGameStateSlice = createSlice({
    name: 'repaint_game_settings',
    initialState,
    reducers: {
        UpdateStartTime(state, action: PayloadAction<number>) {
            state.startTime = action.payload;
        },
        UpdateEndTime(state, action: PayloadAction<number>) {
            state.endTime = action.payload;
        },
        UpdatePrevMap(state, action: PayloadAction<Cell[][]>) {
            state.prevMap = action.payload;
        },
        UpdatePrevCapturedCount(state, action: PayloadAction<number>) {
            state.prevCapturedCount = action.payload;
        },
        UpdateGameSettings(state, action: PayloadAction<GameStepResponseDTO>) {
            state.gameSettings = action.payload;
        },
        UpdateWin(state, action: PayloadAction<boolean>) {
            state.isWin = action.payload;
        },
        StartNewGame(state) {
            state.startTime = null;
            state.endTime = null;
            state.prevMap = null;
            state.prevCapturedCount = null;
            state.gameSettings = null;
            state.isWin = null;
        },
    }
})

export default RepaintGameStateSlice;