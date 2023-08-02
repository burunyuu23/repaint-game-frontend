import React from 'react';
import Game from "@/l2_widgets/repaint_game/game/game";
import styles from './page.module.scss'

const Page = () => {
        return (
        <main className={styles.main}>
                <Game/>
        </main>
    );
};

Page.propTypes = {};

export default Page;