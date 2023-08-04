import React from 'react';
import {Alert} from "@mui/material";
import styles from './fixedErrorAlert.module.scss';

type Props = {
    errorMessage: string,
    closable?: boolean
    onclose?: () => void
}

const FixedErrorAlert = ({errorMessage, closable, onclose}: Props) => {

    return (
        <Alert
            className={styles.alert}
            severity="error"
            onClose={closable ? onclose : undefined}>
            {errorMessage}
        </Alert>
    )
        ;
};

export default FixedErrorAlert;