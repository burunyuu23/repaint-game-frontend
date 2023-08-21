import React, {useEffect, useState} from 'react';

type Props = {
    isLoad: React.MutableRefObject<boolean>,
    children: React.ReactNode,
    inverse?: boolean
}

const TriggerBannerAbsolute = ({isLoad, children, inverse}: Props) => {
    const [triggerRerender, setTriggerRerender] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTriggerRerender(() => isLoad.current);

            if (isLoad.current)
                clearInterval(interval);
        }, 1)
    }, []);

    return (
        <div style={{position: "absolute"}}>
            {inverse === true && !triggerRerender &&
                children
            }
            {inverse !== true && triggerRerender &&
                children
            }
        </div>
    );
};
export default TriggerBannerAbsolute;