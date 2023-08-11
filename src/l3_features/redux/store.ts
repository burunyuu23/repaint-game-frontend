import {combineReducers, configureStore} from "@reduxjs/toolkit";
import RepaintGameStateSlice from "@/l3_features/redux/repaint_game/state_reducer";
import UserSettingsReducer from "@/l3_features/redux/user_settings/reducer";
import RepaintGameSettingsSlice from "@/l3_features/redux/repaint_game/settings_reducer";

const rootReducer = combineReducers({
    repaint_game__state: RepaintGameStateSlice.reducer,
    repaint_game__settings: RepaintGameSettingsSlice.reducer,
    user__settings: UserSettingsReducer.reducer,
})
export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;