"use client";

import React, {useEffect, useRef, useState} from 'react';
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import styled from "@emotion/styled";
import {emptyRect, Rect, startFromXYRect} from '@/l5_shared/types/rect';
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import {getRandomArbitrary, getRandomInt} from "@/l5_shared/util/random";
import styles from "./repaintGameBanner.module.scss"
import {PerspectiveCamera} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Link from "next/link";
import BannerAnimation from "@/l5_shared/lib/banner_animation/bannerAnimation";
import {Euler} from "three";
import RepaintGameBannerLogo from "@/l3_features/banners/repaint_game_banner/repaintGameBannerLogo";

const RepaintGameBanner = React.memo(() => {
    return (
            <CarouselPaper>
                <Link href={"/game"} className={styles.link}/>
                <div className={styles.mainWrapper}>
                    <RepaintGameBannerLogo />

                    <div className={styles.videoWrapper}>
                        <Canvas shadows style={{minHeight: "100%"}}>
                            <PerspectiveCamera
                                makeDefault
                                position={[0, 1, 2]}
                                fov={100}
                                zoom={2}
                            />
                            <ambientLight intensity={0.6}/>
                            <BannerAnimation path={"/repaint_game_banner/repaint.gltf"}
                                             repeatTime={85}
                                             rotation={new Euler(0, 5 * Math.PI / 3, 11 * Math.PI / 6, 'XYZ')}/>
                        </Canvas>
                    </div>
                </div>
            </CarouselPaper>
    );
});

export default RepaintGameBanner;