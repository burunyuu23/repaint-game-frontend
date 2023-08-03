import React from 'react';
import {Alert} from "@mui/material";
import styles from './fixedErrorAlert.module.scss';

type Props = {
    errorMessage: string,
    closable?: boolean
}

const FixedErrorAlert = ({errorMessage, closable}: Props) => {

    let alert;

    if (closable === true) {
        alert = <Alert
            className={styles.alert}
            severity="error"
            onClose={() => {}}>
            {errorMessage}
        </Alert>
    } else {
        alert = <Alert
            className={styles.alert}
            severity="error">
            {errorMessage}
        </Alert>
    }

    return (
        <>{alert}</>
    )
        ;
};

export default FixedErrorAlert;