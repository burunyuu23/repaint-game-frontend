import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";
import Link from 'next/link';
import styled from "@emotion/styled";
import {emptyRect, Rect, startFromXYRect} from '@/l5_shared/types/rect';
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import {getRandomInt} from "@/l5_shared/util/random";

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
      transform: translateX(50%);
    `
    const RepaintGameBannerFront = styled.img`
      position: absolute;
      transform: translateX(50%);

      @media (max-width: ${banner_sizes.width}px) {
        transform: scale(${bannerModifier}) translateX(${(bannerModifier-1)*10 + 50}%);
      }
    `

    const [horSpeedColorfulRect, setHorSpeedColorfulRect] = useState<number>(1)
    const [vertSpeedColorfulRect, setVertSpeedColorfulRect] = useState<number>(1)

    const [horSpeedBlackRect, setHorSpeedBlackRect] = useState<number>(1)
    const [vertSpeedBlackRect, setVertSpeedBlackRect] = useState<number>(1)

    const generateRect = (rect: Rect, horSpeed: number, vertSpeed: number, setHorSpeed: Function, setVertSpeed: Function) => {
        if (rect.top <= 0)
            setVertSpeed(getRandomInt(1,3))
        if (rect.bottom >= banner_sizes.height)
            setVertSpeed(-getRandomInt(1,3))

        if (rect.left <= 0)
            setHorSpeed(getRandomInt(1,3))
        if (rect.right >= banner_sizes.width)
            setHorSpeed(-getRandomInt(1,3))

        const top = rect.top + vertSpeed

        const right = rect.right + horSpeed +
            (rect.right - rect.left > getRandomInt(450, 900) ? getRandomInt(-1,0) :
                rect.right - rect.left < getRandomInt(0, 600) ? getRandomInt(0,1) : getRandomInt(-1,1));

        const bottom = rect.bottom + vertSpeed +
            (rect.bottom - rect.top > getRandomInt(150, 200) ? getRandomInt(-1,0) :
                rect.bottom - rect.top < getRandomInt(0, 150) ? getRandomInt(0,1) : getRandomInt(-1,1));

        const left = rect.left + horSpeed

        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left
        }
    }


    function updateState() {
        if (window.innerWidth / banner_sizes.width < 1)
            setBannerModifier(window.innerWidth / banner_sizes.width);

        setColorfulRect(colorfulRect =>
            generateRect(colorfulRect, horSpeedColorfulRect, vertSpeedColorfulRect, setHorSpeedColorfulRect, setVertSpeedColorfulRect));

        setBlackRect(blackRect =>
            generateRect(blackRect, horSpeedBlackRect, vertSpeedBlackRect, setHorSpeedBlackRect, setVertSpeedBlackRect));

        animationFrameIdRef.current = requestAnimationFrame(updateState);
    }

    useEffect(() => {
        setBlackRect(startFromXYRect(banner_sizes.width, banner_sizes.height))
    }, [])

    useLayoutEffect(() => {
        updateState();

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [horSpeedColorfulRect, vertSpeedColorfulRect, horSpeedBlackRect, vertSpeedBlackRect]);

    return (
        <Link href={"/game"}>
            <CarouselPaper>
                <RepaintGameBannerElement>
                    <RepaintGameBannerFront src="/repaint_game_banner/base.png" alt="base front"/>
                </RepaintGameBannerElement>

                <RepaintGameBannerElement style={{
                    clip: `rect(${colorfulRect.top}px, ${colorfulRect.right}px, ${colorfulRect.bottom}px, ${colorfulRect.left}px)`,
                }}>
                    <RepaintGameBannerBack src="/repaint_game_banner/colorful_back.png"
                                           alt="colorful back"/>
                    <RepaintGameBannerFront src="/repaint_game_banner/colorful_front.png"
                                            alt="colorful front"
                                            style={{mixBlendMode: "darken"}}/>
                </RepaintGameBannerElement>

                <RepaintGameBannerElement style={{
                    clip: `rect(${blackRect.top}px, ${blackRect.right}px, ${blackRect.bottom}px, ${blackRect.left}px)`,
                }}>
                    <RepaintGameBannerBack src="/repaint_game_banner/black_back.png"
                                           alt="black back"/>
                    <RepaintGameBannerFront src="/repaint_game_banner/black_front.png"
                                            alt="black front"/>
                </RepaintGameBannerElement>
            </CarouselPaper>
        </Link>
    );
});

export default RepaintGameBanner;