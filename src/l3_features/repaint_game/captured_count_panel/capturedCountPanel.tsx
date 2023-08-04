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
    selected?: boolean
}

const CapturedCountPanel = ({size, colorId, colors, colorCount, capturedCount, prevCapturedCount, selected}: Props) => {

    const CapturedColorButton = styled.div`

      width: calc(${size});
      height: calc(${size});

      @media ${devices.mobileS} {
        width: calc(${size}/1.5);
        height: calc(${size}/1.5);
      }

      @media ${devices.tablet} {
        width: calc(${size}/1.15);
        height: calc(${size}/1.15);
      }
    `

    return (
        <div className={styles.capturedCountPanel}>
            <CapturedColorButton>
                <ColorButton
                    colorHexCode={colors[colorId].hexCode}
                    onclick={() => {
                    }}
                    notclickable
                    glowable={selected}
                >
                    {colorCount}
                </ColorButton>
            </CapturedColorButton>
            {prevCapturedCount !== -1 && capturedCount - prevCapturedCount > 0 &&
                <AnimatedTimedAlert
                    style={{
                        color: colors[colorId].hexCode,
                        textShadow: `0 0 10px ${colors[colorId].hexCode}`
                    }}>
                    {capturedCount - prevCapturedCount > 0 ? '+' : ''}{capturedCount - prevCapturedCount}
                </AnimatedTimedAlert>
            }
        </div>
    );
};

CapturedCountPanel.propTypes = {};

export default CapturedCountPanel;