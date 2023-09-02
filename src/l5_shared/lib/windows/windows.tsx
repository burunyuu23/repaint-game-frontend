import React from 'react';
import styles from "./windows.module.scss"
import Scrollable from '@/l5_shared/lib/scrollable/scrollable';

type Props = {
    children: React.ReactNode,
    titles: string[],
    selected: number,
    setSelected: Function
}
const Windows = ({children, titles, selected, setSelected}: Props) => {
    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <Scrollable>
                    {
                        titles.map((title, index) =>
                            <span className={[styles.headerElement, selected === index ? styles.enabled : styles.disabled].join(" ")}
                                  onClick={() => setSelected(index)}>
                            {title}
                        </span>)
                    }
                </Scrollable>
            </header>
            <div className={styles.window}>
                {children}
            </div>
        </div>
    );
};

Windows.propTypes = {};

export default Windows;