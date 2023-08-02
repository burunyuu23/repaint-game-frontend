import React from 'react';
import {Button} from "@mui/material";
import styles from './colorButton.module.scss';

type Props = {
    colorHexCode: string,
    onclick: () => void
}

const ColorButton = ({colorHexCode, onclick}: Props) => {

    return (
            <Button onClick={onclick}
                    className={styles.colorButton}
                    style={{backgroundColor: colorHexCode}}>
            </Button>
    );
}

export default ColorButton;