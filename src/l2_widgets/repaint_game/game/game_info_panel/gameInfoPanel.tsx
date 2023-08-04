import React from 'react';
import Timer from "@/l5_shared/lib/timer/timer";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import RoundCounter from "@/l3_features/repaint_game/round_counter/roundCounter";
import styles from './gameInfoPanel.module.scss';
import CapturedCountPanel from "@/l3_features/repaint_game/captured_count_panel/capturedCountPanel";
import TimerIcon from '@mui/icons-material/Timer';
import styled from "@emotion/styled";
import {devices} from "@/l5_shared/css/consts";

type Props = {
    data: GameStepResponseDTO,
    size: string,
    prevCapturedCount: number
}

const GameInfoPanel = React.memo(({data, size, prevCapturedCount}: Props) => {

    const CapturedCountPanelWrapper = styled.div`
      grid-template-columns: repeat(6, 1fr);

      @media ${devices.tablet} {
        display: flex;
        flex-direction: column;
      }
    `

    const InfoPanel = styled.div`
      height: auto;

      @media ${devices.tablet} {
        height: 100%;
      }
    `

    return (
        <InfoPanel className={styles.infoPanel}>
            <RoundCounter
                currentRound={data.currentRound}
                maxRounds={data.maxRounds}/>

            <div
                className={styles.timerPanel}>
                <div
                    className={styles.timer}>
                    <TimerIcon  />
                    <Timer
                        stop={data.end}
                        startTime={data.startTime}/>
                </div>
            </div>

            <CapturedCountPanelWrapper className={styles.capturedCountPanel}>
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
            </CapturedCountPanelWrapper>
        </InfoPanel>
    );
});

export default GameInfoPanel;