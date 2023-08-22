"use client";

import React from 'react';
import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import BannerAnimation from "@/l5_shared/lib/banner_animation/bannerAnimation";
import {Euler} from "three";
import styles from "./dnlkkHubBanner.module.scss";
import { Button } from '@mui/material';
import styled from 'styled-components';
import {devices} from "@/l5_shared/consts/css/display_size";

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
                    <div className={styles.loginPanel}>
                        <Button>Login</Button>
                        <Button>Register</Button>
                    </div>
                    {/*<div className={styles.loginPanel}>*/}
                    {/*    <Button>Profile</Button>*/}
                    {/*    <Button>Logout</Button>*/}
                    {/*</div>*/}
                </div>
            </div>

        </CarouselPaper>
    );
};

export default DnlkkHubBanner;