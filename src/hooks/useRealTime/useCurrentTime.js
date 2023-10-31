import React, { useState, useEffect } from 'react';
import useTimeStamp from './useTimeStamp';

export default function useCurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const timestamp = useTimeStamp(currentTime);


    return timestamp;
}

