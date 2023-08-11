"use client";
import React, {useCallback, useEffect} from 'react';
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
import RepaintGameSettingsSlice from "@/l3_features/redux/repaint_game/settings_reducer";

const doStart = async (dispatch: AppDispatch, paletteId: number, fieldSize: number, maxRounds: number) => {
    dispatch(RepaintGameStateSlice.actions.StartNewGame());

    const startResponseDTO = await NonRatingNoAuthService.startGame(
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

const doStep = async (dispatch: AppDispatch, data: GameStepResponseDTO, id: number) => {
    dispatch(RepaintGameStateSlice.actions.UpdatePrevMap(data.map));
    dispatch(RepaintGameStateSlice.actions.UpdatePrevCapturedCount(data.capturedCount));

    const stepResponseDTO = await NonRatingNoAuthService.stepGame(
        {
            gameId: data.gameId,
            colorId: id
        })
    stepResponseDTO.startTime = data.startTime

    dispatch(RepaintGameStateSlice.actions.UpdateGameSettings(stepResponseDTO));

    if (stepResponseDTO.end) {
        dispatch(RepaintGameStateSlice.actions.UpdateWin(stepResponseDTO.capturedCount === stepResponseDTO.fieldSize * stepResponseDTO.fieldSize));
        console.log(stepResponseDTO.capturedCount === stepResponseDTO.fieldSize * stepResponseDTO.fieldSize);
    }
}

const Content = React.memo(() => {
    const settingsOpen = useAppSelector(state => state.repaint_game__settings.settingsOpen);

    const data = useAppSelector(state => state.repaint_game__state.gameSettings)

    const paletteId = useAppSelector(state => state.repaint_game__settings.paletteId);
    const fieldSize = useAppSelector(state => state.repaint_game__settings.fieldSize);
    const maxRound = useAppSelector(state => state.repaint_game__settings.maxRound)

    const dispatch = useAppDispatch();
    const {
        fetching: fetchStartGame,
        isLoading: isStartGameLoading,
        error: startGameError
    } = useFetch(useCallback(async (dispatch: AppDispatch) =>
        await doStart(dispatch, paletteId, fieldSize, maxRound), [paletteId, fieldSize, maxRound]));

    useEffect(() => {
        fetchStartGame(dispatch);
    }, [fieldSize, maxRound]);

    const {
        fetching: fetchStepGame,
        isLoading: isStepGameLoading,
        error: stepGameError,
        clearError: clearError
    } = useFetch(async (dispatch: AppDispatch, id: number) =>
        await doStep(dispatch, data, id)
    )

    const settingsAction = (payload: boolean) =>
        dispatch(RepaintGameSettingsSlice.actions.UpdateSettingsOpen(payload));

    return (
        <div className={styles.main}>

            {stepGameError !== '' &&
                (<FixedErrorAlert errorMessage={stepGameError}
                                  onclose={() => clearError !== undefined ? clearError() : {}}
                                  closable/>)}
            {data === null &&
                <div>Loading...</div>
            }
            {data !== null && data.end &&
                (<EndGamePanel
                    restart={() => fetchStartGame(dispatch)}
                    settingsOpen={() => settingsAction(true)}/>)}
            {settingsOpen &&
                <SettingsPanel
                    handleClose={() => settingsAction(false)}/>}
            {data !== null &&
                <GameInfoPanel
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