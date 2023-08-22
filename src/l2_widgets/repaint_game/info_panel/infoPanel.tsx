"use client";
import React from 'react';
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import styled from "styled-components";
import {devices} from "@/l5_shared/consts/css/display_size";

type Props = {
    handleClose: () => void,
}

const InfoPanel = React.memo(({handleClose}: Props) => {

    const FontControlPanel = styled.div`
      font-size: 16px;

      @media ${devices.tablet} {
        font-size: 1.57rem;
      }
    `

    return (
        <WhiteModalPanel handleClose={handleClose} title={"Info"}>
                <FontControlPanel>
                    Здесь будет информация об игре.
                </FontControlPanel>
        </WhiteModalPanel>
    );
});

export default InfoPanel;