"use client"

import React, {useEffect, useState} from 'react';
import {GameStartResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStartResponseDTO";
import Map from "@/l3_features/repaint_game/map/map";
import ColorButton from "@/l3_features/repaint_game/color_button/colorButton";
import styles from './game.module.scss';
import styled from "@emotion/styled";
import {NonRatingNoAuthService} from "@/l4_entities/repaint-game/nonrating-noauth-service/service";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import {useFetch} from "@/l5_shared/hooks/useFetch";
import { Alert } from '@mui/material';
import FixedErrorAlert from "@/l3_features/fixed_error_alert/fixedErrorAlert";
import EndGamePanel from "@/l3_features/end_game_panel/endGamePanel";

const Game = () => {
    let [data, setData] =
        useState<GameStepResponseDTO | null>(null);

    useEffect(() => {
        fetchStartGame().then(r => r);
    }, [])

    const {
        fetching: fetchStartGame,
        isLoading: isStartGameLoading,
        error: startGameError
    } = useFetch(async () => {
        const startResponseDTO = await NonRatingNoAuthService.startGame(
            {
                paletteId: 0,
                fieldSize: 12,
                maxRounds: 22,
            }) as GameStartResponseDTO & { currentRound: number; end: boolean; stepTime: Date };
        startResponseDTO.currentRound = 0;
        startResponseDTO.end = false;
        startResponseDTO.stepTime = startResponseDTO.startTime;
        setData(startResponseDTO);
    })

    const {
        fetching: fetchStepGame,
        isLoading: isStepGameLoading,
        error: stepGameError
    } = useFetch(async (id: number) => {
        const stepResponseDTO = await NonRatingNoAuthService.stepGame(
            {
                gameId: data!.gameId,
                colorId: id
            })
        stepResponseDTO.startTime = data!.startTime

        setData(stepResponseDTO);
    })


    const mapSize = 75;
    const buttonPanelGap = 10;
    const mapSizeStyle = (divider: number) => `min(${mapSize/divider}dvh, ${mapSize/divider}dvw)`;
    const mapSizeDefaultStyle = `${mapSizeStyle(1)}`;

    const Game = styled.div`
      grid-template-columns: repeat(${data?.fieldSize}, 1fr);
    `

    const ButtonPanel = styled.div`
      width: ${mapSizeDefaultStyle};
      height:  calc(${mapSizeStyle(6)} - ${buttonPanelGap}px);
      column-gap: ${buttonPanelGap}px;
    `

    return (
        <Game>

            <q>{data?.stepTime.valueOf()}</q>

            {data !== null && <EndGamePanel
                currentRound={0}
                maxRounds={22}
                win={false}
                duration={data!.startTime}
            />}

            {stepGameError !== '' &&
                (<FixedErrorAlert errorMessage={stepGameError} closable />)}

            {data?.end === true &&
                (<EndGamePanel
                    currentRound={0}
                    maxRounds={22}
                    win={false}
                    duration={data.startTime}
                />)}


            {data !== null && <div>
                <h1>{data.currentRound}/{data.maxRounds}</h1>
                    <Map map={data.map}
                                        colors={data!.colors}
                                        onclick={() => {}}
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
        </Game>
    );
};

export default Game;