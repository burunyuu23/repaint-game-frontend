import React, {useEffect, useState} from 'react';

type Props = {
    startTime: Date
}

const Timer = ({startTime}: Props) => {
    const date = new Date(startTime)

    const [animationFrameId, setAnimationFrameId] =
        useState<number | null>(null);
    const [duration, setDuration] =
        useState<number>(new Date().getTime() - date.getTime());

    const updateDuration = () => {
        setDuration(duration => new Date().getTime() - date.getTime())

        setAnimationFrameId(requestAnimationFrame(updateDuration));
    };

    useEffect(() => {
        updateDuration();

        return (cancelAnimationFrame(animationFrameId as number));
    }, [])


    return (
        <div>
            <div>{duration}</div>
        </div>
    );
};

export default Timer;