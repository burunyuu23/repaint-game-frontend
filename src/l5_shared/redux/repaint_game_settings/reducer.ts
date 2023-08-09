import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";

export type RepaintGameSettings = {
    paletteId: number,
    fieldSize: number,
    maxRound: number,
    startTime: number | null,
    endTime: number | null,
    prevMap: Cell[][] | null,
    prevCapturedCount: number | null,
    gameSettings: GameStepResponseDTO | null
}

export const initialState: RepaintGameSettings = {
    paletteId: 0,
    fieldSize: 12,
    maxRound: 22,
    startTime: null,
    endTime: null,
    prevMap: null,
    prevCapturedCount: null,
    gameSettings: null
}

export const RepaintGameSettingsSlice = createSlice({
    name: 'repaint_game_settings',
    initialState,
    reducers: {
        UpdateFieldSize(state, action: PayloadAction<number>) {
            state.fieldSize = action.payload;
        },
        UpdateMaxRound(state, action: PayloadAction<number>) {
            state.maxRound = action.payload;
        },
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
        StartNewGame(state) {
            state.startTime = null;
            state.endTime = null;
            state.prevMap = null;
            state.prevCapturedCount = null;
            state.gameSettings = null;
        },
    }
})

export default RepaintGameSettingsSlice;