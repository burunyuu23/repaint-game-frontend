import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fieldSizeDefault, fieldSizeMax, fieldSizeMin, maxRoundsDefault, maxRoundsMax, maxRoundsMin} from "@/l5_shared/lib/consts/consts";

export type RepaintGameSettings = {
    paletteId: number,
    fieldSize: number,
    maxRound: number,
    settingsOpen: boolean,
}

const getInitialItemFromLocalStorage = <T extends number>(itemName: string, type: string, minValue: T, maxValue: T, defaultValue: T): T => {
    const fieldSize = localStorage.getItem(itemName);

    if (fieldSize) {
        let parsedFieldSize = JSON.parse(fieldSize)
        if (typeof parsedFieldSize === type && parsedFieldSize > minValue && parsedFieldSize < maxValue) {
            return parsedFieldSize as T;
        }
    }
    return defaultValue as T;
}

export const initialState: RepaintGameSettings = {
    paletteId: getInitialItemFromLocalStorage("paletteId", "number", -1, Number.MAX_VALUE, 0),
    fieldSize: getInitialItemFromLocalStorage("fieldSize", "number", fieldSizeMin, fieldSizeMax, fieldSizeDefault),
    maxRound: getInitialItemFromLocalStorage("maxRound", "number", maxRoundsMin, maxRoundsMax, maxRoundsDefault),
    settingsOpen: false,
}

export const RepaintGameSettingsSlice = createSlice({
    name: 'repaint_game__settings',
    initialState,
    reducers: {
        UpdatePaletteId(state, action: PayloadAction<number>) {
            state.paletteId = action.payload;
        },
        UpdateFieldSize(state, action: PayloadAction<number>) {
            state.fieldSize = action.payload;
        },
        UpdateMaxRound(state, action: PayloadAction<number>) {
            state.maxRound = action.payload;
        },
        UpdateSettingsOpen(state, action: PayloadAction<boolean>){
            state.settingsOpen = action.payload
        }
    }
})

export default RepaintGameSettingsSlice;