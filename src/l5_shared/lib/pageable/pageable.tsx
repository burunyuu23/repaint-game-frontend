import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import styled from "styled-components";
import styles from "./pageable.module.scss"
import Scrollable from "@/l5_shared/lib/scrollable/scrollable";

type Props = {
    children: React.ReactNode,
    onClick: (val: number) => void,
    totalPages: number,
    currentPage: number
}

const Pageable = ({children, onClick, totalPages, currentPage}: Props) => {

    const range = Math.min(totalPages, 3)
    const [offset, setOffset] = useState(0);
    const changeOffset = (val: number) => setOffset(prevState =>
        val === -1 && leftPage <= 1 ?
            prevState :
            val === 1 && rightPage >= totalPages ?
                prevState : (prevState + val))

    const [leftPage, setLeftPage] = useState(currentPage)
    const [rightPage, setRightPage] = useState(currentPage + range - 1)

    useEffect(() => {
        if (offset !== 0) {
            setLeftPage(Math.max(leftPage + offset, 1))
            setRightPage(Math.min(rightPage + offset, totalPages))
            setOffset(0)
        }
    }, [offset]);

    useEffect(() => {
        setLeftPage(Math.max(currentPage - Math.ceil((range - 1) / 2), 1))

        if (currentPage === 1)
            setRightPage(Math.min(leftPage + range - 1, totalPages))
        else
            setRightPage(Math.min(currentPage + Math.floor((range - 1) / 2), totalPages))

        if (currentPage === totalPages)
            setLeftPage(Math.min(rightPage - range + 1, 1))
    }, [currentPage]);

    const Wrapper = styled.div`
      height: 100%;
      display: grid;
      align-content: space-between;
    `

    const ButtonPanel = styled.div`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(${rightPage - leftPage + 2 + 1}, 1fr);
    `

    return (
        <Wrapper>
            <Scrollable>
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
                                onClick={() => onClick(currentPage - 1 - 1)}
                                style={currentPage === 1 ? {color: "white"} : {color: "yellow"}}
                                disabled={currentPage === 1}>
                            prev
                        </Button>
                    </div>
                    {Array(Math.min(rightPage, totalPages) - Math.max(leftPage, 1) + 1).fill(0).map((_, index) => (
                        <Button className={styles.button}
                                style={{color: `${index + Math.max(leftPage, 1) === currentPage ? 'yellow' : 'white'}`}}
                                onClick={() => onClick(index + Math.max(leftPage, 1) - 1)}>
                            {index + Math.max(leftPage, 1)} {leftPage} {rightPage} {Math.min(rightPage, totalPages) - Math.max(leftPage, 1) + 1}
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
                                onClick={() => onClick(currentPage + 1 - 1)}
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