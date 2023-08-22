import React from "react";
import ModalPanel from "@/l5_shared/lib/modal_panel/modalPanel";
import styles from "./whiteModalPanel.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
    handleClose: () => void,
    children: React.ReactNode,
    title: string
}

const WhiteModalPanel = React.memo(({handleClose, children, title}: Props) => {

    return (
        <ModalPanel zIndex={10} bg={"#eeeeff"} className={styles.whiteModalPanel}>
            <header className={[styles.header, styles.text].join(' ')}>{title}</header>

            <div>
                {children}
            </div>

            <CancelIcon
                id={styles.cancelIconPath}
                onClick={handleClose}
                className={styles.cancelIcon}/>
        </ModalPanel>
    );
});

export default WhiteModalPanel;