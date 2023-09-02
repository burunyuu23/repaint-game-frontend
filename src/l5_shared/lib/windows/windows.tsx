import React from 'react';
import styles from "./windows.module.scss"
import Scrollable from '@/l5_shared/lib/scrollable/scrollable';
import {Title} from "@/l5_shared/types/title";

type Props = {
    children: React.ReactNode,
    headers: Title[],
    selected: number,
    setSelected: Function,
    className?: string,
    vertical?: boolean
}

// TODO: fix vertical width
const Windows = ({children, headers, selected, setSelected, className, vertical}: Props) => {

    type MinMax = {
        min: number,
        max: number
    }
    const getMinMaxIndex = (headerIndex: number): MinMax => {
        let min = 0;
        let max = 0;
        for (let i = 0; i <= headerIndex; i++) {
            if (i < headerIndex)
                min += headers[i].titles.length;
            else
                max += min + headers[i].titles.length;
        }
        return {
            min,
            max
        }
    }

    const selectedInRange = (headerIndex: number) => selected < getMinMaxIndex(headerIndex).max && selected >= getMinMaxIndex(headerIndex).min

    return (
        <div className={[styles.main, className ? className : "", vertical ? styles.verticalHeader : ""].join(" ")}>
            <Scrollable>
                <header className={[styles.header, vertical ? styles.vertical : ""].join(" ")}>
                    {
                        headers.map((header, headerIndex) =>
                            <div>
                                <header className={[styles.headerElement,
                                    selectedInRange(headerIndex) ?
                                        styles.enabled : styles.disabled,
                                    styles.headerHeader].join(" ")}
                                        onClick={() => setSelected(getMinMaxIndex(headerIndex).min)}>
                                    {header.header}
                                </header>
                                {header.titles.map((title, titleIndex) =>
                                    <span className={[styles.headerElement,
                                        selected === getMinMaxIndex(headerIndex).min + titleIndex
                                            ? styles.enabled : styles.disabled
                                    ].join(" ")}
                                          onClick={() => setSelected(getMinMaxIndex(headerIndex).min + titleIndex)}>
                                        {title}
                                    </span>)
                                }
                            </div>)
                    }
                </header>
            </Scrollable>
            <div className={styles.window}>
                {children}
            </div>
        </div>
    );
};

Windows.propTypes = {};

export default Windows;