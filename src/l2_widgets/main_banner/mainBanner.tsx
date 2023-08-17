"use client";
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./mainBanner.module.scss"
import RepaintGameBanner from "@/l3_features/repaint_game/repaint_game_banner/repaintGameBanner";
import styled from "@emotion/styled";
import CarouselPaper from "@/l5_shared/lib/carousel_paper/carouselPaper";

const MainBanner = () => {
    const MainBannerWrapper = styled.div`
      position: relative;
      z-index: 0;
    `

    return (
        <MainBannerWrapper>
            <Carousel
                NextIcon={<NavigateNextIcon/>}
                PrevIcon={<NavigateBeforeIcon/>}

                className={styles.carousel}

                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: 'yellow',
                        color: 'black'
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        textAlign: 'center',
                        position: "fixed",
                    }
                }}

                interval={20000}
            >
                <RepaintGameBanner/>
                <RepaintGameBanner/>
                <RepaintGameBanner/>
            </Carousel>
        </MainBannerWrapper>
    );
};

export default MainBanner;