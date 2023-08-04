import React from 'react';
import ModalPanel from "@/l5_shared/lib/modal_panel/modalPanel";
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
    handleClose: () => void
}

const SettingsPanel = ({handleClose}: Props) => {

    return (
        <ModalPanel zIndex={10}>
            <p>hi!</p><CancelIcon onClick={handleClose} />

        </ModalPanel>
    );
}

export default SettingsPanel;