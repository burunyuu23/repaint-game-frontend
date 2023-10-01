"use client";

import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@mui/material";
import styled from "styled-components";
import styles from "./pageable.module.scss"
import Scrollable from "@/l5_shared/lib/scrollable/scrollable";
import {useWindowDimensions} from "@/l5_shared/hooks/useWindowDimensions";
import {sizes} from "@/l5_shared/consts/css/display_size";

type Props = {
    children: React.ReactNode,
    onClick: (offset: number, limit: number) => void,
    totalPages: number,
    currentPage: number
}

const Pageable = ({children, onClick, totalPages, currentPage}: Props) => {

    const range = useRef(Math.min(totalPages, 3))
    const limit = useRef(7)
    const [offset, setOffset] = useState(0);

    const windowDimensions = useWindowDimensions();

    useEffect(() => {
        if (windowDimensions && windowDimensions.width) {
            if (windowDimensions.width >= sizes.laptopL) {
                range.current = (Math.min(totalPages, 9))
                limit.current = 7
                updateButtonPanel();
            }
            if (windowDimensions.width < sizes.laptopL) {
                range.current = (Math.min(totalPages, 7))
                limit.current = 5
                updateButtonPanel();
            }
            if (windowDimensions.width <= (sizes.laptopL / 2)) {
                range.current = (Math.min(totalPages, 3))
                limit.current = 3
                updateButtonPanel();
            }
            if (windowDimensions.width <= sizes.mobileM) {
                range.current = (Math.min(totalPages, 2))
                limit.current = 3
                updateButtonPanel();
            }
            onClick(0, limit.current)
        }
    }, [windowDimensions]);

    const changeOffset = (val: number) => setOffset(prevState =>
        val === -1 && leftPage <= 1 ?
            prevState :
            val === 1 && rightPage >= totalPages ?
                prevState : (prevState + val))

    const [leftPage, setLeftPage] = useState(currentPage)
    const [rightPage, setRightPage] = useState(currentPage + range.current - 1)

    useEffect(() => {
        if (offset !== 0) {
            setLeftPage(Math.max(leftPage + offset, 1))
            setRightPage(Math.min(rightPage + offset, totalPages))
            setOffset(0)
        }
    }, [offset, limit]);

    useEffect(() => {
        if (currentPage <= range.current/2) {
            setLeftPage(1)
            setRightPage(Math.min(range.current, totalPages))
        }
        else if (currentPage >= totalPages - range.current/2 + 1) {
            setRightPage(totalPages)
            setLeftPage(Math.max(totalPages - range.current + 1, 1))
        }
        else {
            setRightPage(Math.min(currentPage + Math.floor((range.current - 1) / 2), totalPages))
            setLeftPage(Math.max(currentPage - Math.ceil((range.current - 1) / 2), 1))
        }
    }, [currentPage, range.current, limit]);

    const Wrapper = styled.div`
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 72px;
      align-content: space-between;
      gap: 20px;
    `

    const [ButtonPanel, setButtonPanel] = useState(styled.div`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(${range.current + 2}, 1fr);
    `)

    const updateButtonPanel = () =>
        setButtonPanel(styled.div`
          width: 100%;
          display: grid;
          grid-template-columns: repeat(${range.current + 2}, 1fr);
        `)


    return (
        <Wrapper>
            <Scrollable >
                {children}
            </Scrollable>
            <Scrollable>
                <ButtonPanel>
                    <div className={styles.navButtonPanel}>
                        <Button className={[styles.button, styles.navButton].join(" ")}
                                onClick={() => changeOffset(-1)}
                                style={leftPage === 1 ? {color: "white"} : {color: "yellow"}}
                                disabled={leftPage === 1}>
                            watch
                        </Button>
                        <Button className={[styles.button, styles.navButton].join(" ")}
                                onClick={() => onClick(currentPage - 1 - 1, limit.current)}
                                style={currentPage === 1 ? {color: "white"} : {color: "yellow"}}
                                disabled={currentPage === 1}>
                            prev
                        </Button>
                    </div>
                    {Array(Math.min(rightPage, totalPages) - Math.max(leftPage, 1) + 1).fill(0).map((_, index) => (
                        <Button key={index + Math.max(leftPage, 1)} className={styles.button}
                                style={{color: `${index + Math.max(leftPage, 1) === currentPage ? 'yellow' : 'white'}`}}
                                onClick={() => onClick(index + Math.max(leftPage, 1) - 1, limit.current)}>
                            {index + Math.max(leftPage, 1)}
                        </Button>
                    ))}
                    <div className={styles.navButtonPanel}>
                        <Button className={[styles.button, styles.navButton].join(" ")}
                                onClick={() => changeOffset(1)}
                                style={rightPage === totalPages ? {color: "white"} : {color: "yellow"}}
                                disabled={currentPage === totalPages}>
                            watch
                        </Button>
                        <Button className={[styles.button, styles.navButton].join(" ")}
                                onClick={() => onClick(currentPage + 1 - 1, limit.current)}
                                style={currentPage === totalPages ? {color: "white"} : {color: "yellow"}}
                                disabled={currentPage === totalPages}>
                            next
                        </Button>
                    </div>
                </ButtonPanel>
            </Scrollable>
        </Wrapper>
    );
};

export default Pageable;