import {combineReducers, configureStore, Middleware} from "@reduxjs/toolkit";
import UserSettingsReducer from "@/l5_shared/redux/user_settings/reducer";
import RepaintGameSettingsSlice from "@/l5_shared/redux/repaint_game_settings/reducer";

const rootReducer = combineReducers({
    repaint_game_settings: RepaintGameSettingsSlice.reducer,
    user_settings: UserSettingsReducer,
})
export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;