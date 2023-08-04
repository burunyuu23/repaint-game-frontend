import React from 'react';
import styles from "./animatedTimedAlertText.module.scss";

type Props = {
    children?: React.ReactNode,
    style?: React.CSSProperties
}

const AnimatedTimedAlert = ({children, style}: Props) => {
    return (
        <div className={styles.animatedTimedAlert}
             style={style}>
            {children}
        </div>
    );
};

export default AnimatedTimedAlert;