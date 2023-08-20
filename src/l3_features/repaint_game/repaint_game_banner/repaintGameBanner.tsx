"use client";

import React, {useEffect, useRef, useState} from 'react';
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import styled from "@emotion/styled";
import {emptyRect, Rect, startFromXYRect} from '@/l5_shared/types/rect';
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import {getRandomArbitrary, getRandomInt} from "@/l5_shared/util/random";
import {Button} from "@mui/material";
import {useRouter} from 'next/navigation';

const RepaintGameBanner = React.memo(() => {
    const [colorfulRect, setColorfulRect] = useState<Rect>(emptyRect)
    const [blackRect, setBlackRect] = useState<Rect>(emptyRect)
    const [bannerModifier, setBannerModifier] = useState<number>(1)

    const animationFrameIdRef = useRef<number | null>(null);

    const RepaintGameBannerElement = styled.div`
      position: absolute;
      z-index: 0;

      display: flex;
      justify-content: center;
    `
    const RepaintGameBannerBack = styled.img`
      position: absolute;
      filter: blur(20px);
      transform: scaleX(${bannerModifier}) translateX(50%);
    `
    const RepaintGameBannerFront = styled.img`
      position: absolute;
      transform: translateX(50%);

      @media (max-width: ${banner_sizes.width}px) {
        transform: scale(${bannerModifier}) translateX(${(bannerModifier - 1) * 10 + 50}%);
      }
    `

    const [prevAnimationFrame, setPrevAnimationFrame] = useState<number>(0);

    const [horSpeedColorfulRect, setHorSpeedColorfulRect] = useState<number>(1)
    const [vertSpeedColorfulRect, setVertSpeedColorfulRect] = useState<number>(1)

    const [horSpeedBlackRect, setHorSpeedBlackRect] = useState<number>(1)
    const [vertSpeedBlackRect, setVertSpeedBlackRect] = useState<number>(1)

    const generateRect = (rect: Rect, horSpeed: number, vertSpeed: number, setHorSpeed: Function, setVertSpeed: Function) => {
        if (rect.top <= 0)
            setVertSpeed(getRandomArbitrary(0.5, 2))
        if (rect.bottom >= banner_sizes.height)
            setVertSpeed(-getRandomArbitrary(0.5, 2))

        if (rect.left <= 0)
            setHorSpeed(getRandomArbitrary(1, 3))
        if (rect.right >= (banner_sizes.width + 50) * (bannerModifier < 1 ? bannerModifier : 1))
            setHorSpeed(-getRandomArbitrary(1, 3))

        let top = rect.top
        let right = rect.right
        let bottom = rect.bottom
        let left = rect.left

        if (animationFrameIdRef.current !== null &&
            animationFrameIdRef.current - prevAnimationFrame >= 500 && animationFrameIdRef.current - prevAnimationFrame <= 510) {
            top += getRandomInt(0, 5)
            left += getRandomInt(0, 20)
            right += getRandomInt(-20, 0)
            bottom += getRandomInt(-5, 0)
        }

        top += vertSpeed

        right += horSpeed +
            (rect.right - rect.left > getRandomInt(450, 900)* (bannerModifier < 1 ? bannerModifier : 1) ? -1 :
                rect.right - rect.left < getRandomInt(0, 600)* (bannerModifier < 1 ? bannerModifier : 1) ? 1 : getRandomInt(-1, 1));

        bottom += vertSpeed +
            (rect.bottom - rect.top > getRandomInt(150, 200) ? -1 :
                rect.bottom - rect.top < getRandomInt(0, 150) ? 1 : getRandomInt(-1, 1));

        left += horSpeed

        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        }
    }


    function updateState() {
        const modifier = window.innerWidth / banner_sizes.width;
        if (modifier < 1)
            setBannerModifier(modifier);

        setColorfulRect(colorfulRect =>
            generateRect(colorfulRect, horSpeedColorfulRect, vertSpeedColorfulRect, setHorSpeedColorfulRect, setVertSpeedColorfulRect));

        setBlackRect(blackRect =>
            generateRect(blackRect, horSpeedBlackRect, vertSpeedBlackRect, setHorSpeedBlackRect, setVertSpeedBlackRect));

        if (animationFrameIdRef.current !== null) {
            if (prevAnimationFrame === 0) {
                setPrevAnimationFrame(animationFrameIdRef.current)
            }
            if (animationFrameIdRef.current - prevAnimationFrame >= 500) {
                setPrevAnimationFrame(animationFrameIdRef.current)
            }
        }

        animationFrameIdRef.current = requestAnimationFrame(updateState);
    }

    useEffect(() => {
        setBlackRect(startFromXYRect(banner_sizes.width * (bannerModifier < 1 ? bannerModifier : 1), 0))
    }, [])

    useEffect(() => {
        updateState();

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [horSpeedColorfulRect, vertSpeedColorfulRect, horSpeedBlackRect, vertSpeedBlackRect]);

    const router = useRouter();

    const handleClick = () => {
        router.push("/game")

        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
    }

    return (
        <Button onClick={handleClick}
                style={{width: "100%"}}>
            <CarouselPaper>
                <RepaintGameBannerElement>
                    <RepaintGameBannerFront src="/repaint_game_banner/base.png" alt="base front"/>
                </RepaintGameBannerElement>

                <RepaintGameBannerElement
                    style={{
                        clip: `rect(${colorfulRect.top}px, ${colorfulRect.right}px, ${colorfulRect.bottom}px, ${colorfulRect.left}px)`,
                    }}>
                    <RepaintGameBannerBack src="/repaint_game_banner/colorful_back.png"
                                           alt="colorful back"/>
                    <RepaintGameBannerFront src="/repaint_game_banner/colorful_front.png"
                                            alt="colorful front"
                                            style={{mixBlendMode: "darken"}}/>
                </RepaintGameBannerElement>

                <RepaintGameBannerElement
                    style={{
                        clip: `rect(${blackRect.top}px, ${blackRect.right}px, ${blackRect.bottom}px, ${blackRect.left}px)`,
                    }}>
                    <RepaintGameBannerBack src="/repaint_game_banner/black_back.png"
                                           alt="black back"/>
                    <RepaintGameBannerFront src="/repaint_game_banner/black_front.png"
                                            alt="black front"/>
                </RepaintGameBannerElement>
            </CarouselPaper>
        </Button>
    );
});

export default RepaintGameBanner;