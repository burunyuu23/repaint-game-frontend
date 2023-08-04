import styles from "./modalPanel.module.scss";
import {Modal} from "@mui/base";
import {Box} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode,
    zIndex?: number
}

const ModalPanel = ({children, zIndex}: Props) => {

    const baseZIndex = zIndex ? zIndex : 999;

    return (
        <div className={styles.background}
             style={{zIndex: baseZIndex - 1}} >
            <Modal
                className={styles.modal}
                style={{zIndex: baseZIndex}}
                open={true}>
                <Box className={styles.main}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
};

export default ModalPanel;
