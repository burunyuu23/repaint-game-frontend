import React from 'react';
import Timer from "@/l5_shared/lib/timer/timer";
import {GameStepResponseDTO} from "@/l4_entities/repaint-game/dtos/responses/gameStepResponseDTO";
import RoundCounter from "@/l3_features/repaint_game/round_counter/roundCounter";
import styles from './gameInfoPanel.module.scss';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from "@mui/icons-material/Settings";
import {Button} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type Props = {
    data: GameStepResponseDTO,
    settingsOpen: () => void,
    restart: () => void
}

const GameInfoPanel = React.memo(({restart, settingsOpen, data}: Props) => {

    return (
        <div className={styles.infoPanel}>
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

            <div className={styles.settingsPanel}>
                <Button
                    className={styles.settingsButton}
                    onClick={restart}  >
                    <RestartAltIcon className={styles.iconButton}/>
                </Button>

                <Button
                    className={styles.settingsButton}
                    onClick={settingsOpen}  >
                    <SettingsIcon className={styles.iconButton}/>
                </Button>
            </div>
        </div>
    );
});

export default GameInfoPanel;