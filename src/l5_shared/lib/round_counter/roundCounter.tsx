import React from 'react';
import styles from './roundCounter.module.scss';

type Props = {
    currentRound: number,
    maxRounds: number,
}

const RoundCounter = ({currentRound, maxRounds}: Props) => {
    return (
        <div className={styles.container}>
            {currentRound}/{maxRounds}
        </div>
    );
};

export default RoundCounter;