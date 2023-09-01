import React from 'react';
import styles from "./windows.module.scss"

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
                {
                    titles.map((title, index) =>
                        <span className={[styles.headerElement, selected === index ? styles.enabled : styles.disabled].join(" ")}
                        onClick={() => setSelected(index)}>
                            {title}
                        </span>)
                }
            </header>
            <div className={styles.window}>
                {children}
            </div>
        </div>
    );
};

Windows.propTypes = {};

export default Windows;