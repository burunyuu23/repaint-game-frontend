"use client";

import React, {useEffect, useState} from 'react';
import styles from "./navBar.module.scss"
import {PaletteService} from "@/l4_entities/repaint-game/palette-service/service";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import {Button} from "@mui/material";
import {defaultColors} from "@/l5_shared/consts/repaint_game_settings";
import AsideNavBar from "./aside_nav_bar/asideNavBar";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {get_is_token_active} from "@/l5_shared/util/cookie_worker";

const NavBar = () => {
    const [baseColors, setBaseColors] = useState<string[]>([])
    const [entered, setEntered] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchColors();

        get_is_token_active(dispatch)
    }, [])

    const fetchColors = () => {
        PaletteService.getBasePalette()
            .then(resp => setBaseColors(resp.palette.map(color => color.hexCode)))
            .catch(() => setBaseColors(defaultColors.map(color => color.hexCode)))
    };


    return (
        <header className={styles.header}>
            <div className={styles.headerBackground}/>
            <nav className={styles.nav}>

                <Link href={"/"} className={styles.logoTextActive}>
                    DnlkkHub
                </Link>
                <Button onClick={() =>
                    setEntered((prevState) => !prevState)}>
                    <WidgetsIcon
                        id={styles.asideNavBarIcon}
                        className={styles.logoTextActive}/>
                </Button>

                <AsideNavBar entered={entered}
                             baseColors={baseColors}
                             onClose={() => setEntered(false)}/>

            </nav>
        </header>
    );
};

export default NavBar;