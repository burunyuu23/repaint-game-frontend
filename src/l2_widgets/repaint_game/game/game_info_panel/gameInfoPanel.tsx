import React from 'react';
import Timer from "@/l3_features/timer/timer";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import RoundCounter from "@/l3_features/repaint_game/round_counter/roundCounter";
import styles from './gameInfoPanel.module.scss';
import CapturedCountPanel from "@/l3_features/repaint_game/captured_count_panel/capturedCountPanel";

type Props = {
    data: GameStepResponseDTO,
    size: string,
    prevCapturedCount: number
}

const GameInfoPanel = React.memo(({data, size, prevCapturedCount}: Props) => {

    return (
        <div className={styles.infoPanel}>
            <RoundCounter
                currentRound={data.currentRound}
                maxRounds={data.maxRounds}/>

            <Timer
                stop={data.end}
                startTime={data.startTime}/>

            <div className={styles.capturedCountPanel}>
                {data.colorsCount.map((colorCount, index) => (
                    <CapturedCountPanel
                        size={size}
                        capturedCount={data.capturedCount}
                        prevCapturedCount={data.map[0][0].value === index ? prevCapturedCount : -1}
                        colorCount={colorCount}
                        colors={data.colors}
                        colorId={index}
                        selected={index === data.map[0][0].value}
                    />
                ))}
            </div>
        </div>
    );
});

export default GameInfoPanel;