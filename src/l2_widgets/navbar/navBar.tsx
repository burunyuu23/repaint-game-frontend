"use client";

import React, {useEffect, useState} from 'react';
import styles from "./navBar.module.scss"
import {PaletteService} from "@/l4_entities/repaint-game/palette-service/service";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import {Button} from "@mui/material";
import {defaultColors} from "@/l5_shared/consts/repaint_game_settings";
import AsideNavBar from "./aside_nav_bar/asideNavBar";
import {cookie_get_access_token, cookie_get_refresh_token, cookie_set_token} from "@/l5_shared/util/cookie_worker";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {AuthService} from "@/l4_entities/user/auth-service/service";

const NavBar = () => {
    const [baseColors, setBaseColors] = useState<string[]>([])
    const [entered, setEntered] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    useEffect(() => {
        fetchColors();

        if (cookie_get_access_token())
            dispatch(UserSettingsSlice.actions.UpdateIsAuth(true))
        else {
            const refresh_token = cookie_get_refresh_token()
            if (refresh_token) {
                AuthService.refreshToken({refresh_token})
                    .then(resp => cookie_set_token(resp))
                dispatch(UserSettingsSlice.actions.UpdateIsAuth(true))
            }
        }
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