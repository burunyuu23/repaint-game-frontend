import React, {useState} from 'react';
import ModalPanel from "@/l5_shared/lib/modal_panel/modalPanel";
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './settingPanel.module.scss'
import {Button, Slider} from "@mui/material";
import Palette from "@/l5_shared/lib/palette/palette";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styled from "@emotion/styled";
import {RainbowColorStyled} from "@/l5_shared/lib/rainbow_color_styled/rainbowColorStyled";

type Props = {
    handleClose: () => void,
    colors: Color[]
}

const SettingsPanel = ({colors, handleClose}: Props) => {

    const PalettesPanel = styled.div`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    `

    const SliderStyled = RainbowColorStyled(colors.map(color => color.hexCode), "slider")
    const ButtonStyled = RainbowColorStyled(colors.map(color => color.hexCode), "button")

    const [fieldSize, setFieldSize] = useState(12)
    const [maxRounds, setMaxRounds] = useState(22)

    const handleFieldSizeChange = (event: Event, newFieldSize: number | number[]) => {
        setFieldSize(newFieldSize as number)
    }
    const handleMaxRoundsChange = (event: Event, newMaxRounds: number | number[]) => {
        setMaxRounds(newMaxRounds as number)
    }

    const handleSave = () => {

        setTimeout(() =>
            handleClose()
        , 500)
    }

    return (
        <ModalPanel zIndex={10} bg={"#eeeeff"} className={styles.settingPanel}>
            <header className={styles.header}>Settings</header>
            <SliderStyled>
                <header>Field size: {fieldSize}x{fieldSize}</header>
                <Slider
                    className="slider"
                    size="small"
                    value={fieldSize}
                    onChange={handleFieldSizeChange}
                    min={2}
                    max={30}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </SliderStyled>
            <SliderStyled>
                <header>Max rounds: {maxRounds}</header>
                <Slider
                    className="slider"
                    size="small"
                    value={maxRounds}
                    onChange={handleMaxRoundsChange}
                    min={1}
                    max={100}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
            </SliderStyled>

            <header>Palette</header>
            <PalettesPanel>
                {colors.map(color =>
                    <Palette key={color.id}
                             initColor={color.hexCode}/>
                )}
            </PalettesPanel>

            <CancelIcon onClick={handleClose} className={styles.cancelIcon}/>

            <ButtonStyled>
                <Button className="button" onClick={handleSave}>Save</Button>
            </ButtonStyled>
        </ModalPanel>
    );
}

export default SettingsPanel;