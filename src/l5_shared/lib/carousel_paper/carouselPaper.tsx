import React from 'react';
import {Paper} from '@mui/material';
import styles from "./carouselPaper.module.scss"
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";

type Props = {
    children: React.ReactNode,
}
const CarouselPaper = ({children}: Props) => {
    return (
        <Paper className={styles.paper}
               style={{
                   maxHeight: banner_sizes.height,
                   minHeight: banner_sizes.height,
                   height: banner_sizes.height,
               }}>
                {children}
        </Paper>
    );
};
export default CarouselPaper;