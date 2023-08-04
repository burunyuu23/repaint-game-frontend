import React, {useEffect, useState} from 'react';

type Props = {
    startTime: Date,
    stop: boolean,
}

const Timer = ({startTime, stop}: Props) => {
    const date = new Date(startTime)

    const [animationFrameId, setAnimationFrameId] =
        useState<number | null>(null);
    const [duration, setDuration] =
        useState<number>(new Date().getTime() - date.getTime());

    const updateDuration = () => {
        setDuration(duration => new Date().getTime() - date.getTime())


        if (stop) {
            cancelAnimationFrame(animationFrameId as number);
        } else {
            setAnimationFrameId(requestAnimationFrame(updateDuration));
        }
    };


    useEffect(() => {
        updateDuration();

        return (cancelAnimationFrame(animationFrameId as number));
    }, [])

    return (
        <div>{Math.floor(duration / 1000)}:{duration % 1000}s</div>
    );
};

export default Timer;