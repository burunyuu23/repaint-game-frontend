import {createSlice} from "@reduxjs/toolkit";

export type UserSettings = {
}

export const initialState: UserSettings = {
}

export const UserSettingsSlice = createSlice({
    name: 'user__settings',
    initialState,
    reducers: {
    }
})

export default UserSettingsSlice;