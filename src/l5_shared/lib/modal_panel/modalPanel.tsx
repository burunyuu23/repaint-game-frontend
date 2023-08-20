import styles from "./modalPanel.module.scss";
import {Modal} from "@mui/base";
import {Box} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode,
    zIndex?: number,
    bg?: string,
    className?: string
}

const ModalPanel = ({children, zIndex, bg, className}: Props) => {

    const baseZIndex = zIndex ? zIndex : 999;
    const baseBg = bg ? bg : "black"
    const baseClassname = className ? className : ""

    return (
        <div className={styles.background}
             style={{zIndex: baseZIndex - 1, background: baseBg}} >
            <Modal
                className={styles.modal}
                style={{zIndex: baseZIndex, background: baseBg}}
                open={true}>
                <div className={[styles.main, baseClassname].join(' ')}>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default ModalPanel;
