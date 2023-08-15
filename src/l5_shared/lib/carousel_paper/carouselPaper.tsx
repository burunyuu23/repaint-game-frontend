import React from 'react';
import { Paper } from '@mui/material';
import styles from "./carouselPaper.module.scss"

type Props = {
    children: React.ReactNode
}
const CarouselPaper = ({children} : Props) => {
    return (
        <Paper className={styles.paper}>
                {children}
        </Paper>
    );
};
export default CarouselPaper;