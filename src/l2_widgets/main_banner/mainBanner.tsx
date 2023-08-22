"use client";

import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./mainBanner.module.scss"
import RepaintGameBanner from "@/l3_features/banners/repaint_game_banner/repaintGameBanner";
import styled from "@emotion/styled";
import DnlkkHubBanner from "@/l3_features/banners/dnlkkhub_banner/dnlkkHubBanner";
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import TriggerBannerAbsolute from "@/l5_shared/lib/timed_trigger_banner_absolute/triggerBannerAbsolute";

const MainBanner = () => {
    const MainBannerWrapper = styled.div`
      position: relative;
      z-index: 0;
    `

    const bannerIsLoad = useRef<boolean>(false)
    const [triggerRerender, setTriggerRerender] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTriggerRerender(() => bannerIsLoad.current);

            if (bannerIsLoad.current)
                clearInterval(interval);
        }, 1)
    }, []);

    return (
        <MainBannerWrapper>
            <TriggerBannerAbsolute isLoad={bannerIsLoad} inverse>
                <div style={{background: "black", width: "98vw", height: `${banner_sizes.height}px`, position: "absolute", zIndex: 2}}/>
            </TriggerBannerAbsolute>
            <Carousel
                NextIcon={<NavigateNextIcon/>}
                PrevIcon={<NavigateBeforeIcon/>}

                className={styles.carousel}

                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: 'yellow',
                        color: 'black',
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        textAlign: 'center',
                        display: `${triggerRerender ? "block" : "none"}`,
                        position: "fixed",
                    }
                }}

                interval={200000}
            >
                <DnlkkHubBanner setter={() => bannerIsLoad.current = true} />
                <RepaintGameBanner/>
            </Carousel>
        </MainBannerWrapper>
    );
};

export default MainBanner;