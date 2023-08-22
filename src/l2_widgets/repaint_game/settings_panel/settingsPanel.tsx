"use client";
import React, {useState} from 'react';
import styles from './settingPanel.module.scss'
import {Button} from "@mui/material";
import Palette from "@/l5_shared/lib/palette/palette";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styled from "@emotion/styled";
import {RainbowColorStyled} from "@/l5_shared/lib/rainbow_color_styled/rainbowColorStyled";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import RepaintGameSettingsSlice from "@/l3_features/redux/repaint_game/settings_reducer";
import {fieldSizeDefault, fieldSizeMax, fieldSizeMin, maxRoundsDefault, maxRoundsMax, maxRoundsMin} from "@/l5_shared/consts/repaint_game_settings";
import SliderStyled from "@/l3_features/repaint_game/slider_styled/sliderStyled";
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";

type Props = {
    handleClose: () => void,
}

const SettingsPanel = React.memo(({handleClose}: Props) => {
    const PalettesPanel = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    `
    const dispatch = useAppDispatch();

    const colors: Color[] = useAppSelector(state => state.repaint_game__state.gameSettings!.colors);
    const colorsHexCodes = colors.map(color => color.hexCode)

    const ButtonStyled = RainbowColorStyled(colorsHexCodes, "button", "color")

    const [paletteId, setPaletteId] = useState(useAppSelector(state => state.repaint_game__settings.paletteId))
    const [fieldSize, setFieldSize] = useState(useAppSelector(state => state.repaint_game__settings.fieldSize))
    const [maxRounds, setMaxRounds] = useState(useAppSelector(state => state.repaint_game__settings.maxRound))

    const handleFieldSizeChange = (event: Event, newFieldSize: number | number[]) => {
        setFieldSize(newFieldSize as number)
    }
    const handleMaxRoundsChange = (event: Event, newMaxRounds: number | number[]) => {
        setMaxRounds(newMaxRounds as number)
    }

    const save = () => {
        localStorage.setItem('paletteId', JSON.stringify(paletteId));
        localStorage.setItem('fieldSize', JSON.stringify(fieldSize));
        localStorage.setItem('maxRounds', JSON.stringify(maxRounds));

        dispatch(RepaintGameSettingsSlice.actions.UpdateFieldSize(fieldSize));
        dispatch(RepaintGameSettingsSlice.actions.UpdateMaxRound(maxRounds));

        handleClose();
    }

    return (
        <WhiteModalPanel handleClose={handleClose} title={"Settings"}>
            <SliderStyled
            title={`Field size: ${fieldSize}x${fieldSize}`}
            value={fieldSize}
            onChange={handleFieldSizeChange}
            min={fieldSizeMin}
            max={fieldSizeMax}/>

            <SliderStyled
                title={`Max rounds: ${maxRounds}${maxRounds !== Math.round(fieldSize*maxRoundsDefault/fieldSizeDefault) ? " (Recommended: " + Math.round(fieldSize*maxRoundsDefault/fieldSizeDefault) + ")" : ""}`}
                value={maxRounds}
                onChange={handleMaxRoundsChange}
                min={maxRoundsMin}
                max={maxRoundsMax}/>

            <header className={styles.text}>Palette</header>
            <PalettesPanel>
                {colors.map(color =>
                    <Palette key={color.id}
                             initColor={color.hexCode}/>
                )}
            </PalettesPanel>

            <ButtonStyled className={styles.buttonsPanel}>
                <Button className="button" onClick={() => setMaxRounds(Math.round(fieldSize*maxRoundsDefault/fieldSizeDefault))}>Recommended</Button>
                <Button className="button" onClick={save}>Save</Button>
                <Button className="button" onClick={() => {
                    setFieldSize(fieldSizeDefault)
                    setMaxRounds(maxRoundsDefault)
                }}>Default</Button>
            </ButtonStyled>
        </WhiteModalPanel>
    );
});

export default SettingsPanel;