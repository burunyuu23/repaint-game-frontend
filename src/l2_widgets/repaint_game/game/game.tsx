"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import Map from "@/l3_features/repaint_game/map/map";
import styles from './game.module.scss';
import styled from "@emotion/styled";
import {NonRatingNoAuthService} from "@/l4_entities/repaint-game/nonrating-noauth-service/service";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import {useFetch} from "@/l5_shared/hooks/useFetch";
import FixedErrorAlert from "@/l5_shared/lib/fixed_error_alert/fixedErrorAlert";
import EndGamePanel from "@/l2_widgets/repaint_game/game/end_game_panel/endGamePanel";
import GameInfoPanel from "@/l2_widgets/repaint_game/game/game_info_panel/gameInfoPanel";
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import SettingsPanel from "@/l3_features/repaint_game/settings_panel/settingsPanel";
import CapturedCountPanel from "@/l3_features/repaint_game/captured_count_panel/capturedCountPanel";

const Game = React.memo(() => {
    const [data, setData] =
        useState<GameStepResponseDTO | null>(null);

    const [prevCapturedCount, setPrevCapturedCount]
        = useState<number>(0);

    const [prevMap, setPrevMap] = useState<Cell[][] | null>(null);

    const [settingsOpen, setSettingsOpen] = useState(false);

    const {
        fetching: fetchStartGame,
        isLoading: isStartGameLoading,
        error: startGameError
    } = useFetch(useCallback(async () => {
        const startResponseDTO = await NonRatingNoAuthService.startGame(
            {
                paletteId: 0,
                fieldSize: 2,
                maxRounds: 100,
            }) as GameStartResponseDTO & { currentRound: number; end: boolean; stepTime: Date };
        startResponseDTO.currentRound = 0;
        startResponseDTO.end = false;
        startResponseDTO.stepTime = startResponseDTO.startTime;
        setData(startResponseDTO);
        setPrevMap(startResponseDTO.map);
        setPrevCapturedCount(startResponseDTO.capturedCount)
    }, []));

    useEffect(() => {
        fetchStartGame();
    }, [])

    const {
        fetching: fetchStepGame,
        isLoading: isStepGameLoading,
        error: stepGameError,
        clearError: clearError
    } = useFetch(async (id: number) => {
        setPrevCapturedCount(data!.capturedCount)
        setPrevMap(data!.map);

        const stepResponseDTO = await NonRatingNoAuthService.stepGame(
            {
                gameId: data!.gameId,
                colorId: id
            })
        stepResponseDTO.startTime = data!.startTime

        setData(stepResponseDTO);
    })


    const mapSize = 60;
    const buttonPanelGap = 10;
    const mapSizeDivider = 1;
    const mapSizeStyle = useCallback((divider: number) =>
        `min(${mapSize / divider}dvh, ${1.5 * mapSize / divider}dvw)`, [mapSize]);
    const mapSizeDefaultStyle = `${mapSizeStyle(mapSizeDivider)}`;
    const size = `calc(${mapSizeStyle(6 * mapSizeDivider)} - ${buttonPanelGap}px)`;

    const GamePanel = styled.div`
      grid-template-columns: repeat(2, 1fr);
      height: 90dvh;
    `

    const ButtonPanel = styled.div`
      column-gap: ${buttonPanelGap}px;
    `

    const isWin = () =>
        data !== null && data.capturedCount === data.fieldSize * data.fieldSize

    return (
        <GamePanel>
            {data !== null &&
                <div>
                    <GameInfoPanel
                        restart={() => fetchStartGame()}
                        settingsOpen={() => setSettingsOpen(true)}
                        data={data}
                    />
                </div>}

            {stepGameError !== '' &&
                (<FixedErrorAlert errorMessage={stepGameError}
                                  onclose={() => clearError !== undefined ? clearError() : {}}
                                  closable/>)}

            {data !== null && data.end &&
                (<EndGamePanel
                    restart={() => fetchStartGame()}
                    settingsOpen={() => setSettingsOpen(true)}
                    currentRound={data.currentRound}
                    maxRounds={data.maxRounds}
                    win={isWin()}
                    startTime={data.startTime}
                    allCount={data.colorsCount.reduce((sum, value) => sum += value)}
                    capturedCount={data.capturedCount}/>)}

            {settingsOpen &&
                <SettingsPanel
                    colors={data!.colors}
                    handleClose={() => setSettingsOpen(false)}/>}

            {data !== null && <div
                style={{position: "relative"}}>
                {isWin() && <div
                    style={{
                        background: `linear-gradient(135deg, white, ${data.colors[0].hexCode}, black)`,
                        width: mapSizeDefaultStyle,
                        left: 3,
                        top: 3,
                        height: mapSizeDefaultStyle,
                        zIndex: 1,
                        position: "absolute",
                        mixBlendMode: "hard-light"
                    }}/>}
                <Map map={data.map}
                     prevMap={prevMap!}
                     colors={data!.colors}
                     onclick={() => {
                     }}
                     fieldSize={data.fieldSize}
                     mapSize={mapSizeDefaultStyle}
                />

                <ButtonPanel className={styles.buttonPanel}>
                    {data.colors.map((color, index) =>

                                    <CapturedCountPanel
                                        key={color.id}
                                        size={size}
                                        capturedCount={data.capturedCount}
                                        prevCapturedCount={data.map[0][0].value === index ? prevCapturedCount : -1}
                                        colorCount={data.colorsCount[index]}
                                        colors={data.colors}
                                        colorId={index}
                                        onclick={() => fetchStepGame(color.id)}
                                        selected={index === data.map[0][0].value}
                                    />)}
                </ButtonPanel></div>
            }
        </GamePanel>
    );
});

export default Game;