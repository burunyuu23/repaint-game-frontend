"use client";

import React from 'react';
import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import BannerAnimation from "@/l5_shared/lib/banner_animation/bannerAnimation";
import {Euler} from "three";
import styles from "./dnlkkHubBanner.module.scss";

const DnlkkHubBanner = React.memo(() => {
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
                                     rotation={new Euler(0, Math.PI / 6, 0, 'XYZ')}/>
                </Canvas>
                <div className={styles.logoWrapper}>
                    Welcome to the DnlkkHub!
                </div>
        </CarouselPaper>
    );
});

export default DnlkkHubBanner;