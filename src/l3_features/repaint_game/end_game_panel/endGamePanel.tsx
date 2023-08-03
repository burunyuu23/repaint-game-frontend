import React from 'react';

type Props = {
    win: boolean,
    maxRounds: number,
    currentRound: number,
    ratingChange?: number,
    startTime: Date
}

const EndGamePanel = ({win, maxRounds, currentRound, startTime}: Props) => {

    const date = new Date(startTime)

    return (
        <div>
            <q>{win}</q>
            <q>{maxRounds}</q>
            <q>{currentRound}</q>
            <q>{date.valueOf()}</q>
        </div>
    );
};

export default EndGamePanel;