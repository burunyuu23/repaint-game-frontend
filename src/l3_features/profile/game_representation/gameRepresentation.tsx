import React, { } from 'react';
import styles from "./gameRepresentation.module.scss";
import { NonRatingGame } from '@/l4_entities/repaint-game/models/game';
import {formatDateTime, timeRange} from '../../../l5_shared/util/date';

type Props = {
    game: NonRatingGame,
    finalRound: number,
    endTime: Date
}

const GameRepresentation = ({game, finalRound, endTime}: Props) => {
    return (
        <div className={styles.main}>
            <div className={styles.mainIcon}>
                <div className={[styles.end, game.isWin ? styles.win : game.isWin === false ? styles.lose : styles.undefined].join(" ")}></div>
                <div>
                {finalRound}
                </div>
                <hr style={{width: "100%"}}/>
                <div>
                {game.maxRounds}
                </div>
                <div className={styles.startTime}>
                    {formatDateTime(new Date(game.startTime))}
                </div>
            </div>
            <div className={styles.addInfo}>
                <span>{game.map[0].length}x{game.map[0].length}</span>
                <span>{timeRange(game.startTime, endTime)}</span>
            </div>
        </div>
    )
}

export default GameRepresentation;