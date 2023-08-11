"use client";
import React, {useEffect, useRef, useState} from 'react';
import SecondsPanel from "@/l5_shared/lib/timer/secondsPanel";

type Props = {
    startTime: Date,
    stop: boolean,
}

const Timer = ({stop, startTime}: Props) => {
    const date = new Date(startTime!)

    const animationFrameIdRef = useRef<number | null>(null);

    const [duration, setDuration] =
        useState<number>(new Date().getTime() - date.getTime());

    function updateDuration()  {
        setDuration(duration => new Date().getTime() - date.getTime())

        if (stop) {
            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        } else {
            animationFrameIdRef.current = requestAnimationFrame(updateDuration);
        }
    }

    useEffect(() => {
        updateDuration();

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [stop]);

    return (
        <SecondsPanel time={duration}/>
    );
};

export default Timer;