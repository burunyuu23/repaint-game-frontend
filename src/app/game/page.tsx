import React from 'react';
import Game from "@/l2_widgets/repaint_game/game/game";
import styles from './page.module.scss'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'TheRepaintingGame',
    description: 'Repaint map and fun!',
}

const Page = () => {
        return (
        <div className={styles.main}>
            <Game/>
        </div>
    );
};

Page.propTypes = {};

export default Page;