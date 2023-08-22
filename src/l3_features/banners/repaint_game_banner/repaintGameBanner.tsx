"use client";

import React, {useRef} from 'react';
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import styles from "./repaintGameBanner.module.scss"
import {PerspectiveCamera} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import Link from "next/link";
import BannerAnimation from "@/l5_shared/lib/banner_animation/bannerAnimation";
import {Euler} from "three";
import RepaintGameBannerLogo from "@/l3_features/banners/repaint_game_banner/repaintGameBannerLogo";
import TimedTriggerBannerAbsolute from "@/l5_shared/lib/timed_trigger_banner_absolute/triggerBannerAbsolute";
import RepaintGameBannerPaintBrushTail from "@/l5_shared/lib/repaint_game_banner_paint_brush_tail/repaintGameBannerPaintBrushTail";

const RepaintGameBanner = () => {
    const bannerIsLoad= useRef<boolean>(false)

    return (
        <CarouselPaper>
            <Link href={"/game"} className={styles.link}/>

            <div className={styles.mainWrapper}>
                <RepaintGameBannerLogo/>

                <TimedTriggerBannerAbsolute isLoad={bannerIsLoad}>
                    <RepaintGameBannerPaintBrushTail />
                </TimedTriggerBannerAbsolute>

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
                                         rotation={new Euler(0, 5 * Math.PI / 3, 11 * Math.PI / 6, 'XYZ')}
                                         onBannerLoad={() => bannerIsLoad.current = true}
                        />
                    </Canvas>
                </div>
            </div>
        </CarouselPaper>
    );
};

export default RepaintGameBanner;