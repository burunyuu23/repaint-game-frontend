"use client";

import React, {useRef} from 'react';
import parentStyles from "@/l2_widgets/navbar/navBar.module.scss";
import styles from "./asideNavBar.module.scss"
import Link from "next/link";
import {Transition} from "react-transition-group";
import {RainbowLinearGradientBackgroundStyled} from "@/l5_shared/lib/rainbow_color_styled/rainbowColorStyled";
import styled from "styled-components";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {cookie_token_clear, get_is_token_active} from "@/l5_shared/util/cookie_worker";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";

type Props = {
    entered: boolean,
    onClose: () => void,
    baseColors: string[]
}

const AsideNavBar = ({entered, onClose, baseColors}: Props) => {
    const isAuth = useAppSelector(state => state.user__settings.isAuth)
    const dispatch = useAppDispatch()

    const nodeRef = useRef(null);

    const logo = "TheRepaintingGame"
    const Logo = RainbowLinearGradientBackgroundStyled(baseColors, 90);

    const Header = styled.header`
      font-size: 16px;
      
      display: flex;
      justify-content: left;
    `

    const right = "-100px"

    const defaultStyle = {
        transition: `width 200ms ease-in`,
        width: "300px",
        right: right
    }

    const transitionStyles = (state: string) => {
        switch (state) {
            case "entering":
                return {
                    width: "300px",
                    right: right
                }
            case "entered":
                return {
                    width: "300px",
                    right: 0
                }
            case "exiting":
                return {
                    width: "0px",
                    right: 0
                }
            case "exited":
                return {
                    width: "0px",
                    right: right
                }
        }
    };
    return (
        <Transition
            nodeRef={nodeRef}
            timeout={200}
            in={entered}
        >
            {(state: string) => (
                <aside className={[styles.asideNavBar, styles.asideNavBarTopping].join(" ")}
                     ref={nodeRef}
                     style={{...defaultStyle, ...transitionStyles(state)}}>
                    <div className={styles.asideNavBarBack}/>

                    <Header className={isAuth ? styles.logo : styles.logoMain}>
                        {isAuth &&
                            <Link href={"/profile"}
                                  onClick={onClose}
                                  className={styles.logoTextActive}>
                                Profile
                            </Link>
                        }
                        {!isAuth &&
                            <div className={styles.logoTextNonActive}>
                                Profile
                            </div>
                        }
                    </Header>
                    {isAuth &&
                        <div>
                            <div>
                                <div className={styles.logo}>
                                    <Link href={"/search"}
                                          onClick={onClose}
                                          className={styles.logoTextActive}>
                                        Search users
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className={styles.logo}>
                                    <Link href={"/"}
                                          onClick={() => {
                                              cookie_token_clear()
                                              dispatch(UserSettingsSlice.actions.UpdateIsAuth(get_is_token_active()));
                                              onClose();
                                          }}
                                          className={styles.logoTextActive}>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                    </div>
                    }
                    {!isAuth &&
                        <div>
                            <div className={styles.logo}>
                                <Link href={"/login"} onClick={onClose} className={styles.logoTextActive}>
                                    Login
                                </Link>
                            </div>
                            <div className={styles.logo}>
                                <Link href={"/register"} onClick={onClose} className={styles.logoTextActive}>
                                    Register
                                </Link>
                            </div>
                        </div>
                    }


                    <Header className={styles.logo}>
                        <Link href={"/games"} onClick={onClose} className={styles.logoTextActive}>
                            Games
                        </Link>
                    </Header>
                    <div>
                        <Logo className={[styles.logoBack, styles.logo].join(" ")}>
                            <div>
                                {logo}
                            </div>
                        </Logo>
                        <div className={styles.logo}>
                            <div className={styles.logoText}>
                                <Link href={"/game"} onClick={onClose} className={parentStyles.logoTextActive}>
                                    {logo}
                                </Link>
                            </div>
                        </div>
                    </div>
                        <div className={styles.logo}>
                            <div className={styles.logoText}>
                                <Link href={"/chess"} onClick={onClose} className={parentStyles.logoTextActive}>
                                    chess
                                </Link>
                            </div>
                        </div>
                </aside>
            )}
        </Transition>
    );
};

export default AsideNavBar;