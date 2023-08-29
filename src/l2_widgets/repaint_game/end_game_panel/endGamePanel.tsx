import React from 'react';
import styles from "./endGamePanel.module.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ModalPanel from "@/l5_shared/lib/modal_panel/modalPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import SecondsPanel from "@/l5_shared/lib/timer/secondsPanel";

type Props = {
    restart: () => void,
    settingsOpen: () => void
}

const EndGamePanel = ({restart, settingsOpen}: Props) => {
    const isWin = useAppSelector(state => state.repaint_game__state.isWin);

    const currentRound = useAppSelector(state => state.repaint_game__state.gameSettings!.currentRound);
    const maxRounds = useAppSelector(state => state.repaint_game__state.gameSettings!.maxRounds);
    const allCount = useAppSelector(state => state.repaint_game__state.gameSettings!.colorsCount.reduce((sum: number, value: number) => sum += value));
    const capturedCount = useAppSelector(state => state.repaint_game__state.gameSettings!.capturedCount);

    const startTime = useAppSelector(state => state.repaint_game__state.gameSettings!.startTime);
    const stepTime = useAppSelector(state => state.repaint_game__state.gameSettings!.stepTime);
    const endTime = new Date(stepTime).getTime() - new Date(startTime).getTime();

    return (
        <ModalPanel zIndex={8} bg={"#000000bb"}>
            <header className={styles.header}>
                <h3>You {isWin ? 'win' : 'lose'}!</h3>
                {isWin
                    ?
                    <p>You have {maxRounds - currentRound} rounds left</p>
                    :
                    <p>You have {allCount - capturedCount} colors left</p>}
                <div className={styles.timerPanel}>
                    <p>Elapsed time:&nbsp;</p>
                    <SecondsPanel time={endTime}/>
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