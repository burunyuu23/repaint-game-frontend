"use client";
import React from 'react';
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";

type Props = {
    handleClose: () => void,
}

const InfoPanel = React.memo(({handleClose}: Props) => {

    return (
        <WhiteModalPanel handleClose={handleClose} title={"Info"}>
                Здесь будет информация об игре.
        </WhiteModalPanel>
    );
});

export default InfoPanel;