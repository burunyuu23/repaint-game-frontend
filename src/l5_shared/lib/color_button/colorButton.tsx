import React from 'react';
import {Button} from "@mui/material";
import styles from './colorButton.module.scss';
import styled from "@emotion/styled";

type Props = {
    colorHexCode: string,
    onclick: () => void,
    notclickable?: boolean,
    children?: React.ReactNode,
    glowable?: boolean,
}

const ColorButton = ({colorHexCode, onclick, notclickable, children, glowable}: Props) => {

    return (
            <Button
                onClick={notclickable ? undefined: onclick}
                    className={`${notclickable ? styles.colorButton : styles.clickableColorButton}`}
                    style={
                        glowable === true ? {backgroundColor: colorHexCode,
                        boxShadow: `0 0 10px 5px ${colorHexCode}`} :
                            {backgroundColor: colorHexCode,
                                boxShadow: `0 0 20px ${colorHexCode}`}}>
                <div className={styles.children}>{children}</div>
            </Button>
    );
}

export default ColorButton;