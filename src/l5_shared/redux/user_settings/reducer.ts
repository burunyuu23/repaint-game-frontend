import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserSettings = {
    isTechnicalWork: boolean,
    language: string,
}

export const initialState: UserSettings = {
    isTechnicalWork: false,
    language: "default",
}

export const UserSettingsSlice = createSlice({
    name: 'user_settings',
    initialState,
    reducers: {
        GlobalUpdateLanguage (state, action: PayloadAction<string>){
            state.language = action.payload;
        },
        GlobalUpdateTechWork (state, action: PayloadAction<boolean>){
            state.isTechnicalWork = action.payload;
        },
    }
})

export default UserSettingsSlice.reducer;