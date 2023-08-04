"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import Map from "@/l3_features/repaint_game/map/map";
import ColorButton from "@/l3_features/repaint_game/color_button/colorButton";
import styles from './game.module.scss';
import styled from "@emotion/styled";
import {NonRatingNoAuthService} from "@/l4_entities/repaint-game/nonrating-noauth-service/service";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import {useFetch} from "@/l5_shared/hooks/useFetch";
import FixedErrorAlert from "@/l3_features/fixed_error_alert/fixedErrorAlert";
import EndGamePanel from "@/l3_features/repaint_game/end_game_panel/endGamePanel";
import GameInfoPanel from "@/l2_widgets/repaint_game/game/game_info_panel/gameInfoPanel";
import {Cell} from "@/l4_entities/repaint-game/models/cell";

const Game = React.memo(() => {
    let [data, setData] =
        useState<GameStepResponseDTO | null>(null);

    const [prevCapturedCount, setPrevCapturedCount]
        = useState<number>(0);

    const [prevMap, setPrevMap] = useState<Cell[][] | null>(null);

    const {
        fetching: fetchStartGame,
        isLoading: isStartGameLoading,
        error: startGameError
    } = useFetch(useCallback(async () => {
        const startResponseDTO = await NonRatingNoAuthService.startGame(
            {
                paletteId: 0,
                fieldSize: 22,
                maxRounds: 22,
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
      grid-template-columns: repeat(${data?.fieldSize}, 1fr);
      height: 90dvh;
    `

    const ButtonPanel = styled.div`
      width: ${mapSizeDefaultStyle};
      height: ${size};
      column-gap: ${buttonPanelGap}px;
    `

    return (
        <GamePanel>
            {data !== null && <GameInfoPanel
                prevCapturedCount={prevCapturedCount}
                size={size}
                data={data}
            />}

            {stepGameError !== '' &&
                (<FixedErrorAlert errorMessage={stepGameError}
                                  onclose={() => clearError !== undefined ? clearError() : {}}
                                  closable/>)}

            {data?.end === true &&
                (<EndGamePanel
                    currentRound={0}
                    maxRounds={22}
                    win={false}
                    startTime={data.startTime}
                />)}


            {data !== null && <div>
                <Map map={data.map}
                     prevMap={prevMap!}
                     colors={data!.colors}
                     onclick={() => {
                     }}
                     fieldSize={data.fieldSize}
                     mapSize={mapSizeDefaultStyle}
                />

                <ButtonPanel className={styles.buttonPanel}>
                    {data.colors.map(color =>
                        <ColorButton
                            key={color.id}
                            colorHexCode={color.hexCode}
                            onclick={() => fetchStepGame(color.id)}
                        />)}
                </ButtonPanel></div>
            }
        </GamePanel>
    );
});

export default Game;