import React, {useEffect, useState} from 'react';
import SecondsPanel from "@/l5_shared/lib/timer/secondsPanel";

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
        <SecondsPanel time={duration}/>
    );
};

export default Timer;