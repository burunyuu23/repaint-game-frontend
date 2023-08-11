import React, {useState} from 'react';
import styles from "@/l2_widgets/repaint_game/settings_panel/settingPanel.module.scss";
import {Slider} from "@mui/material";
import {RainbowColorStyled} from "@/l5_shared/lib/rainbow_color_styled/rainbowColorStyled";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {StyledComponent} from "@emotion/styled";
import {Color} from "@/l4_entities/repaint-game/models/color";

type Props = {
    title: string,
    value: number,
    onChange: (event: Event, newFieldSize: number | number[]) => void,
    min: number,
    max: number
}

const SliderStyled = ({title, value, onChange, min, max}: Props) => {

    const colors: Color[] = useAppSelector(state => state.repaint_game__state.gameSettings.colors);
    const colorsHexCodes = colors.map(color => color.hexCode)

    const [SliderStyled, setSliderStyled]
        = useState<StyledComponent<any>>(RainbowColorStyled(colorsHexCodes, "slider span", "color"))

    return (
        <div>
            <header className={styles.text}>{title}</header>
            <SliderStyled className={styles.slider}>
                <Slider
                    className="slider"
                    size="small"
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={1}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </SliderStyled>
        </div>
    );
};

SliderStyled.propTypes = {

};

export default SliderStyled;