import styles from './page.module.scss'
import MainBanner from "@/l2_widgets/main_banner/mainBanner";
import React from "react";
import Panels from "./panels";

export default function Home() {
    return (
        <div className={styles.main}>

            <Panels/>

            <MainBanner/>

            <p>Hi!</p>
            <ul>
                <li>First</li>
                <li>Second</li>
            </ul>
        </div>
    )
}
