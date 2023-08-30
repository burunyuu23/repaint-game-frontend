"use client";

import React, {FC, useCallback} from 'react';
import Map from "@/l3_features/repaint_game/map/map";
import styles from './game.module.scss';
import styled from "@emotion/styled";
import CapturedCountPanel from "@/l3_features/repaint_game/captured_count_panel/capturedCountPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {Color} from "@/l4_entities/repaint-game/models/color";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";

type RatingGameProps = {
    fetchStepGame: Function
}

const Game: FC<RatingGameProps> = React.memo(({fetchStepGame}: RatingGameProps) => {
    const data = useAppSelector(state => state.repaint_game__state.gameSettings)

    const prevCapturedCount = useAppSelector(state => state.repaint_game__state.prevCapturedCount);

    const prevMap = useAppSelector(state => state.repaint_game__state.prevMap);

    const isWin = useAppSelector(state => state.repaint_game__state.isWin);

    const dispatch = useAppDispatch();

    const mapSize = 60;
    const buttonPanelGap = 10;
    const mapSizeDivider = 1;
    const mapSizeStyle = useCallback((divider: number) =>
        `min(${mapSize / divider}dvh, ${1.5 * mapSize / divider}dvw)`, [mapSize]);
    const mapSizeDefaultStyle = `${mapSizeStyle(mapSizeDivider)}`;
    const size = `calc(${mapSizeStyle(6 * mapSizeDivider)} - ${buttonPanelGap}px)`;

    const GamePanel = React.memo(styled.div`
      display: flex;
      flex-direction: column;

      align-items: center;

      position: relative;
      grid-template-columns: repeat(1, 1fr);
      width: max-content;
      height: 90dvh;
    `)

    const ButtonPanel = React.memo(styled.div`
      column-gap: ${buttonPanelGap}px;
    `)

    return (
        <GamePanel>
            {data !== null && <div
                style={{position: "relative"}}>
                {isWin && <div
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
                <Map colors={data!.colors}
                     mapSize={mapSizeDefaultStyle}
                />

                <ButtonPanel className={styles.buttonPanel}>
                    {data.colors.map((color: Color, index: number) =>

                        <CapturedCountPanel
                            key={color.id}
                            size={size}
                            capturedCount={data.capturedCount}
                            prevCapturedCount={data.map[0][0].value === index ? prevCapturedCount! : -1}
                            colorCount={data.colorsCount[index]}
                            colors={data.colors}
                            colorId={index}
                            onclick={() => fetchStepGame(dispatch, color.id)}
                            selected={index === data.map[0][0].value}
                        />)}
                </ButtonPanel></div>
            }
        </GamePanel>
    );
});

export default Game;