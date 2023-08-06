import React from 'react';
import ColorButton from "@/l3_features/repaint_game/color_button/colorButton";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styles from "./capturedCountPanel.module.scss"
import AnimatedTimedAlert from "@/l5_shared/lib/animated_timed_alert_text/animatedTimedAlert";
import styled from "@emotion/styled";
import {devices} from "@/l5_shared/css/consts";

type Props = {
    size: string,
    colorId: number,
    colors: Color[],
    capturedCount: number,
    colorCount: number,
    prevCapturedCount: number,
    selected?: boolean,
    onclick?: () => void
}

const CapturedCountPanel = ({size, colorId, colors, colorCount, capturedCount, prevCapturedCount, selected, onclick}: Props) => {

    const CapturedColorButton = styled.div`
      width: calc(${size});
      height: calc(${size});
    `

    const CapturedCountPanel = styled.div`
        display: flex;
        align-items: start;
        justify-content: center;
    `

    return (
        <CapturedCountPanel>
            <CapturedColorButton>
                <ColorButton
                    colorHexCode={colors[colorId].hexCode}
                    onclick={onclick ? onclick : () => {
                    }}
                    glowable={selected}
                >
                    {colorCount}
                </ColorButton>
            </CapturedColorButton>
            {prevCapturedCount !== -1 && capturedCount - prevCapturedCount > 0 &&
                <AnimatedTimedAlert>
                    {capturedCount - prevCapturedCount > 0 ? '+' : ''}{capturedCount - prevCapturedCount}
                </AnimatedTimedAlert>
            }
        </CapturedCountPanel>
    );
};

CapturedCountPanel.propTypes = {};

export default CapturedCountPanel;