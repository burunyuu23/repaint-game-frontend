"use client";

import React from 'react';
import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import BannerAnimation from "@/l5_shared/lib/banner_animation/bannerAnimation";
import {Euler} from "three";
import styles from "./dnlkkHubBanner.module.scss";
import {Button} from '@mui/material';
import styled from 'styled-components';
import {devices} from "@/l5_shared/consts/css/display_size";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import { cookie_token_clear } from '@/l5_shared/util/cookie_worker';

type Props = {
    setter: () => void
}

const DnlkkHubBanner = ({setter}: Props) => {

    const Logo = styled.div`
      font-size: 16px;

      @media ${devices.mobileM} {
        font-size: 24px;
      }

      @media ${devices.tablet} {
        font-size: 36px;
      }
    `

    const isAuth = useAppSelector(state => state.user__settings.isAuth)
    const dispatch = useAppDispatch();

    return (
        <CarouselPaper>
            <Canvas shadows style={{minHeight: "100%"}}>
                <PerspectiveCamera
                    makeDefault
                    position={[0, 1.15, 1]}
                    fov={60}
                    zoom={1}
                />
                <ambientLight intensity={0.5}/>
                <pointLight position={[1, 2, 1]}/>
                <BannerAnimation path={"/repaint_game_banner/aivar.gltf"}
                                 repeatTime={50}
                                 rotation={new Euler(0, Math.PI / 6, 0, 'XYZ')}
                                 onBannerLoad={setter}
                />
            </Canvas>

            <div className={styles.infoPanel}>
                <div className={styles.logoWrapper}>
                    <Logo>
                        Welcome to the DnlkkHub!
                    </Logo>
                    {!isAuth &&
                        <div className={styles.welcomePanel}>
                            <Button onClick={() => dispatch(UserSettingsSlice.actions.UpdateIsLoginOpen(true))}>
                                Login
                            </Button>
                            <Button onClick={() => dispatch(UserSettingsSlice.actions.UpdateIsRegisterOpen(true))}>
                                Register
                            </Button>
                        </div>}
                    {isAuth &&
                        <div className={styles.welcomePanel}>
                            <Button>Profile</Button>
                            <Button onClick={() => {
                                cookie_token_clear()
                                dispatch(UserSettingsSlice.actions.UpdateIsAuth(false))
                            }}>
                                Logout
                            </Button>
                        </div>
                    }
                    {/*<div className={styles.loginPanel}>*/}
                    {/*</div>*/}
                </div>
            </div>

        </CarouselPaper>
    )
        ;
};

export default DnlkkHubBanner;