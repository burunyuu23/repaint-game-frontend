import React from 'react';
import {Alert} from "@mui/material";
import styles from './fixedErrorAlert.module.scss';

type Props = {
    errorMessage: string
}

const FixedErrorAlert = ({errorMessage}: Props) => {
    return (
        <Alert
            className={styles.alert}
            severity="error"
            onClose={() => {}}>
            {errorMessage}
        </Alert>
    );
};

export default FixedErrorAlert;