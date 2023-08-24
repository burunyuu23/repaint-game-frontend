import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserSettings = {
    isAuth: boolean,
    isLoginOpen: boolean,
    isRegisterOpen: boolean
}

export const initialState: UserSettings = {
    isAuth: false,
    isLoginOpen: false,
    isRegisterOpen: false
}

export const UserSettingsSlice = createSlice({
    name: 'user__settings',
    initialState,
    reducers: {
        UpdateIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        UpdateIsLoginOpen(state, action: PayloadAction<boolean>) {
            state.isLoginOpen = action.payload;
        },
        UpdateIsRegisterOpen(state, action: PayloadAction<boolean>) {
            state.isRegisterOpen = action.payload;
        },
    }
})

export default UserSettingsSlice;