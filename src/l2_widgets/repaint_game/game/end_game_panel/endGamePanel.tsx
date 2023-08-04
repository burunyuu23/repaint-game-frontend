import React from 'react';
import styles from "./endGamePanel.module.scss"
import Timer from "@/l5_shared/lib/timer/timer";
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ModalPanel from "@/l5_shared/lib/modal_panel/modalPanel";

type Props = {
    win: boolean,
    maxRounds: number,
    currentRound: number,
    ratingChange?: number,
    startTime: Date,
    capturedCount: number,
    allCount: number,
    restart: () => void,
    settingsOpen: () => void
}

const EndGamePanel = ({win, maxRounds, currentRound, capturedCount, allCount, startTime, restart, settingsOpen}: Props) => {

    return (
        <ModalPanel zIndex={8}>
            <header className={styles.header}>
                <h3>You {win ? 'win' : 'lose'}!</h3>
                {win
                    ?
                    <p>You have {maxRounds - currentRound} rounds left</p>
                    :
                    <p>You have {allCount - capturedCount} colors left</p>}
                <div className={styles.timerPanel}>
                    <p>Elapsed time:&nbsp;</p>
                    <Timer
                        startTime={startTime}
                        stop/>
                </div>
                <div className={styles.iconButtonPanel}>
                    <button
                        className={styles.iconButton}
                        onClick={restart}
                    >
                        <ChangeCircleIcon/>
                    </button>
                    <button
                        className={styles.iconButton}
                        onClick={settingsOpen}  >
                        <SettingsIcon />
                    </button>
                </div>
            </header>
        </ModalPanel>
    );
};

export default EndGamePanel;