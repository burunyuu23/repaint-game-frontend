import React, {useState} from 'react';
import {MuiColorInput} from "mui-color-input";
import {TinyColor} from "@ctrl/tinycolor";

type Props = {
    initColor: string
}

const Palette = ({initColor}: Props) => {
    const [color, setColor]
        = useState<TinyColor>(new TinyColor(initColor))

    const handleChange = (newValue: string) => {
        setColor(new TinyColor(newValue))
    }

    return (
        <MuiColorInput
            value={color}
            onChange={handleChange}/>)
};

export default Palette;