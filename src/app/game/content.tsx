"use client";
import React, {useCallback, useEffect, useState} from 'react';
import {NonRatingNoAuthService} from "@/l4_entities/repaint-game/nonrating-noauth-service/service";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {useFetch} from "@/l5_shared/hooks/useFetch";
import styles from "@/app/game/page.module.scss";
import FixedErrorAlert from "@/l5_shared/lib/fixed_error_alert/fixedErrorAlert";
import EndGamePanel from "@/l2_widgets/repaint_game/end_game_panel/endGamePanel";
import SettingsPanel from "@/l2_widgets/repaint_game/settings_panel/settingsPanel";
import GameInfoPanel from "@/l2_widgets/repaint_game/game_info_panel/gameInfoPanel";
import Game from "@/l2_widgets/repaint_game/game/game";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import RepaintGameStateSlice from '@/l3_features/redux/repaint_game/state_reducer';
import {AppDispatch} from "@/l3_features/redux/store";
import RepaintGameSettingsSlice, {RepaintGameSettings} from "@/l3_features/redux/repaint_game/settings_reducer";
import {fieldSizeDefault, fieldSizeMax, fieldSizeMin, maxRoundsDefault, maxRoundsMax, maxRoundsMin} from "@/l5_shared/consts/repaint_game_settings";
import InfoPanel from "@/l2_widgets/repaint_game/info_panel/infoPanel";
import Loading from "./loading"
import {NonRatingAuthService} from "@/l4_entities/repaint-game/nonrating-service/service";
import {cookie_get_access_token} from "@/l5_shared/util/cookie_worker";

const doStart = async (dispatch: AppDispatch, paletteId: number, fieldSize: number, maxRounds: number, isAuth: boolean) => {
    dispatch(RepaintGameStateSlice.actions.StartNewGame());

    const service = isAuth ? NonRatingAuthService : NonRatingNoAuthService;

    const startResponseDTO = await service.startGame(
        {
            paletteId: paletteId,
            fieldSize: fieldSize,
            maxRounds: maxRounds,
        }) as GameStartResponseDTO & { currentRound: number; end: boolean; stepTime: Date };
    startResponseDTO.currentRound = 0;
    startResponseDTO.end = false;
    startResponseDTO.stepTime = startResponseDTO.startTime;

    dispatch(RepaintGameStateSlice.actions.UpdateGameSettings(startResponseDTO));
    dispatch(RepaintGameStateSlice.actions.UpdatePrevMap(startResponseDTO.map));
    dispatch(RepaintGameStateSlice.actions.UpdatePrevCapturedCount(startResponseDTO.capturedCount));
}

const doStep = async (dispatch: AppDispatch, data: GameStepResponseDTO, id: number, isAuth: boolean) => {
    dispatch(RepaintGameStateSlice.actions.UpdatePrevMap(data.map));
    dispatch(RepaintGameStateSlice.actions.UpdatePrevCapturedCount(data.capturedCount));

    const service = isAuth ? NonRatingAuthService : NonRatingNoAuthService;

    const stepResponseDTO = await service.stepGame(
        {
            gameId: data.gameId,
            colorId: id
        })
    stepResponseDTO.startTime = data.startTime

    dispatch(RepaintGameStateSlice.actions.UpdateGameSettings(stepResponseDTO));

    if (stepResponseDTO.end) {
        dispatch(RepaintGameStateSlice.actions.UpdateWin(stepResponseDTO.capturedCount === stepResponseDTO.fieldSize * stepResponseDTO.fieldSize));
    }
}

const Content = React.memo(() => {

    const settingsOpen = useAppSelector(state => state.repaint_game__settings.settingsOpen);
    const infoOpen = useAppSelector(state => state.repaint_game__settings.infoOpen);

    const data = useAppSelector(state => state.repaint_game__state.gameSettings)

    const paletteId = useAppSelector(state => state.repaint_game__settings.paletteId);
    const fieldSize = useAppSelector(state => state.repaint_game__settings.fieldSize);
    const maxRound = useAppSelector(state => state.repaint_game__settings.maxRound)

    const [isInit, setIsInit] = useState<boolean>(false);

    const isAuth = useAppSelector(state => state.user__settings.isAuth);

    const dispatch = useAppDispatch();
    const {
        fetching: fetchStartGame,
        isLoading: isStartGameLoading,
        error: startGameError
    } = useFetch(useCallback(async (dispatch: AppDispatch) =>
        await doStart(dispatch, paletteId, fieldSize, maxRound, isAuth), [paletteId, fieldSize, maxRound, isAuth]));

    useEffect(() => {
        if (isInit)
            fetchStartGame(dispatch);
    }, [paletteId, fieldSize, maxRound, isInit, isAuth]);

    useEffect(() => {
        const getInitialItemFromLocalStorage = <T extends number>(itemName: string, type: string, minValue: T, maxValue: T, defaultValue: T): T => {
            const item = localStorage.getItem(itemName);

            if (item !== null) {
                let parsedItem = JSON.parse(item)
                if (typeof parsedItem === type && parsedItem >= minValue && parsedItem <= maxValue) {
                    return parsedItem as T;
                }
            }
            return defaultValue as T;
        }

        const repaintGameSettingsSliceInitialState: RepaintGameSettings = {
            // TODO: paletteId Max value from api
            paletteId: getInitialItemFromLocalStorage("paletteId", "number", 0, Number.MAX_VALUE, 0),
            fieldSize: getInitialItemFromLocalStorage("fieldSize", "number", fieldSizeMin, fieldSizeMax, fieldSizeDefault),
            maxRound: getInitialItemFromLocalStorage("maxRounds", "number", maxRoundsMin, maxRoundsMax, maxRoundsDefault),
            settingsOpen: false,
            infoOpen: false
        }

        dispatch(RepaintGameSettingsSlice.actions.SetState(repaintGameSettingsSliceInitialState));

        setIsInit(true)
    }, []);

    const {
        fetching: fetchStepGame,
        error: stepGameError,
        clearError: clearError
    } = useFetch(async (dispatch: AppDispatch, id: number) =>
        await doStep(dispatch, data!, id, isAuth)
    )

    const infoAction = (payload: boolean) =>
        dispatch(RepaintGameSettingsSlice.actions.UpdateInfoOpen(payload));

    const settingsAction = (payload: boolean) =>
        dispatch(RepaintGameSettingsSlice.actions.UpdateSettingsOpen(payload));

    return (
        <div className={styles.main}>
            {data === null && startGameError !== undefined &&
                <Loading />
            }
            {data === null && !isStartGameLoading && startGameError === undefined &&
                <div style={{color: "red"}}>
                    Loading error
                </div>
            }

            {stepGameError !== '' &&
                (<FixedErrorAlert errorMessage={stepGameError}
                                  onclose={() => clearError !== undefined ? clearError() : {}}
                                  closable/>)}
            {data !== null && data.end &&
                (<EndGamePanel
                    restart={() => fetchStartGame(dispatch)}
                    settingsOpen={() => settingsAction(true)}/>)}
            {data !== null && settingsOpen &&
                <SettingsPanel
                    handleClose={() => settingsAction(false)}/>}
            {infoOpen &&
                <InfoPanel
                    handleClose={() => infoAction(false)}/>}
            {data !== null &&
                <GameInfoPanel
                    info={() => infoAction(true)}
                    restart={() => fetchStartGame(dispatch)}
                    settingsOpen={() => settingsAction(true)}
                />
            }
            <Game
                fetchStepGame={fetchStepGame}
            />
        </div>
    );
});

export default Content;