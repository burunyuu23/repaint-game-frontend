import React from 'react';
import ColorButton from "@/l3_features/repaint_game/color_button/colorButton";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styles from "./capturedCountPanel.module.scss"
import AnimatedTimedAlert from "@/l5_shared/lib/animated_timed_alert_text/animatedTimedAlert";

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
    return (
        <div className={styles.capturedCountPanel}>
            <div style={{width: `${size}`, height: `${size}`}}>
                <ColorButton
                    colorHexCode={colors[colorId].hexCode}
                    onclick={() => {
                    }}
                    notclickable
                    glowable={selected}
                >
                    {colorCount}
                </ColorButton>
            </div>
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