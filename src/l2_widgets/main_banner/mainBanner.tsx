"use client";
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styles from "./mainBanner.module.scss"
import RepaintGameBanner from "@/l3_features/repaint_game/repaint_game_banner/repaintGameBanner";

const MainBanner = () => {
    return (
        <Carousel
            NextIcon={<NavigateNextIcon/>}
            PrevIcon={<NavigateBeforeIcon />}

            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: 'yellow',
                    color: 'black'
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '30px', // 5
                    textAlign: 'center', // 4
                }
            }}
            className={styles.carousel}
        >
            <RepaintGameBanner />
            <RepaintGameBanner />
            <RepaintGameBanner />
        </Carousel>
    );
};

export default MainBanner;