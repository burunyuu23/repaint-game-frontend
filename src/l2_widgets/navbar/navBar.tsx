"use client";

import React, {useEffect, useRef, useState} from 'react';
import styles from "./navBar.module.scss"
import {PaletteService} from "@/l4_entities/repaint-game/palette-service/service";
import {RainbowLinearGradientBackgroundStyled} from "@/l5_shared/lib/rainbow_color_styled/rainbowColorStyled";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import {Transition} from "react-transition-group";
import {Button} from "@mui/material";
import {defaultColors} from "@/l5_shared/consts/repaint_game_settings";

const NavBar = () => {
    const [baseColors, setBaseColors] = useState<string[]>([])

    const logo = "TheRepaintingGame"

    useEffect(() => {
        fetchColors();
    }, [])

    const Logo = RainbowLinearGradientBackgroundStyled(baseColors, 90);

    const fetchColors = () => {
        PaletteService.getBasePalette()
            .then(resp => setBaseColors(resp.palette.map(color => color.hexCode)))
            .catch(() => setBaseColors(defaultColors.map(color => color.hexCode)))
    };

    const right = "-20px"

    const defaultStyle = {
        transition: `width 200ms ease-in`,
        width: "300px",
        right: right
    }

    const transitionStyles = (state: string) => {
        switch (state) {
            case "entering":
                return { width: "300px",
                    right: right }
            case "entered":
                return {width: "300px",
                    right: 0}
            case "exiting":
                return {width: "0px",
                    right: 0}
            case "exited":
                return {width: "0px",
                    right: right}
        }
    };


    const nodeRef = useRef(null);
    const [entered, setEntered] = useState(false);


    return (
        <header className={styles.header}>
            <div className={styles.headerBackground}/>
            <nav className={styles.nav}>

                <Link href={"/"} className={styles.logoTextA}>
                    DnlkkHub
                </Link>
                <Button onClick={() =>
                    setEntered((prevState) => !prevState)}>
                    <WidgetsIcon
                        id={styles.asideNavBarIcon}
                        className={styles.logoTextA}/>
                </Button>


                <Transition
                    nodeRef={nodeRef}
                    timeout={200}
                    in={entered}
                >
                    {(state: string) => (
                        <div className={[styles.asideNavBar, styles.asideNavBarTopping].join(" ")}
                             ref={nodeRef}
                             style={{...defaultStyle, ...transitionStyles(state)}}>
                            <div>
                                <div className={styles.asideNavBarBack} />
                                <Logo className={[styles.logoBack, styles.logo].join(" ")}>
                                    <div>
                                        {logo}
                                    </div>
                                </Logo>
                                <div className={styles.logo}>
                                    <div className={styles.logoText}>
                                        <Link href={"/game"} onClick={() =>
                                            setEntered((prevState) => !prevState)} className={styles.logoTextA}>
                                            {logo}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {Array(20).fill(0).map((obj, index) => (
                                <div key={index} className={styles.logo}>
                                    <div className={styles.logoText}>
                                        <Link href={"/chess"} className={styles.logoTextA}>
                                            chess
                                        </Link>
                                    </div>
                                </div>))}
                        </div>
                    )}
                </Transition>

            </nav>
        </header>
    );
};

export default NavBar;