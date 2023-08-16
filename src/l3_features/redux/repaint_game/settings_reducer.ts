import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fieldSizeDefault, maxRoundsDefault} from "@/l5_shared/consts/repaint_game_settings";

export type RepaintGameSettings = {
    paletteId: number,
    fieldSize: number,
    maxRound: number,
    settingsOpen: boolean,
}

export const initialState: RepaintGameSettings = {
    paletteId: 0,
    fieldSize: fieldSizeDefault,
    maxRound: maxRoundsDefault,
    settingsOpen: false,
}

export const RepaintGameSettingsSlice = createSlice({
    name: 'repaint_game__settings',
    initialState,
    reducers: {
        SetState(state, action: PayloadAction<RepaintGameSettings>) {
          state.paletteId = action.payload.paletteId
            state.fieldSize = action.payload.fieldSize
            state.maxRound = action.payload.maxRound
        },
        UpdatePaletteId(state, action: PayloadAction<number>) {
            state.paletteId = action.payload;
        },
        UpdateFieldSize(state, action: PayloadAction<number>) {
            state.fieldSize = action.payload;
        },
        UpdateMaxRound(state, action: PayloadAction<number>) {
            state.maxRound = action.payload;
        },
        UpdateSettingsOpen(state, action: PayloadAction<boolean>) {
            state.settingsOpen = action.payload
        }
    }
})

export default RepaintGameSettingsSlice;