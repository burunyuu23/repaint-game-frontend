import React from 'react';
import Timer from "@/l5_shared/lib/timer/timer";
import RoundCounter from "@/l5_shared/lib/round_counter/roundCounter";
import styles from './gameInfoPanel.module.scss';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from '@mui/icons-material/Info';
import {Button} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SecondsPanel from "@/l5_shared/lib/timer/secondsPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";

type Props = {
    info: () => void,
    settingsOpen: () => void,
    restart: () => void,
}

const GameInfoPanel = React.memo(({info, restart, settingsOpen}: Props) => {
    const data = useAppSelector(state => state.repaint_game__state.gameSettings)!;

    return (
        <div className={styles.infoPanel}>
            <RoundCounter
                currentRound={data.currentRound}
                maxRounds={data.maxRounds}/>

            <div
                className={styles.timerPanel}>
                <div
                    className={styles.timer}>
                    <TimerIcon/>
                    {data.end &&
                        <SecondsPanel time={new Date(data.stepTime).getTime() - new Date(data.startTime).getTime()}/>
                    }
                    {!data.end &&
                        <Timer
                            stop={data.end}
                            startTime={data.startTime}/>
                    }
                </div>

                {data.stepTime !== null && data.stepTime !== data.startTime &&
                    <div
                        className={styles.timer}>
                        <MoreTimeIcon/>
                        <SecondsPanel time={new Date(data.stepTime).getTime() - new Date(data.startTime).getTime()}/>
                    </div>}
            </div>

            <div className={styles.additionalSettingsPanel}>
                <Button
                    className={styles.settingsButton}
                    onClick={info}>
                    <InfoIcon className={styles.iconButton}/>
                </Button>
            </div>

            <div className={styles.settingsPanel}>
                <Button
                    className={styles.settingsButton}
                    onClick={restart}>
                    <RestartAltIcon className={styles.iconButton}/>
                </Button>

                <Button
                    className={styles.settingsButton}
                    onClick={settingsOpen}>
                    <SettingsIcon className={styles.iconButton}/>
                </Button>
            </div>
        </div>
    );
});

export default GameInfoPanel;