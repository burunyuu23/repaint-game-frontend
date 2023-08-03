import React from 'react';
import {Alert} from "@mui/material";
import styles from './fixedErrorAlert.module.scss';

type Props = {
    errorMessage: string,
    closable?: boolean
}

const FixedErrorAlert = ({errorMessage, closable}: Props) => {

    return (
        <Alert
            className={styles.alert}
            severity="error"
            onClose={closable ? () => {} : undefined}>
            {errorMessage}
        </Alert>
    )
        ;
};

export default FixedErrorAlert;