import React, {useEffect, useRef, useState} from 'react';
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styles from './map.module.scss';
import styled from "@emotion/styled";
import {Transition} from "react-transition-group";

type Props = {
    map: Cell[][],
    prevMap: Cell[][]
    fieldSize: number,
    colors: Color[],
    mapSize: string,
}
const Map = React.memo(({map, prevMap, fieldSize, colors, mapSize}: Props) => {

    const Cells = styled.div`
      grid-template-columns: repeat(${fieldSize}, 1fr);
      width: max-content;
    `

    const Cell = styled.div`
      width: calc(${mapSize} / ${fieldSize});
      height: calc(${mapSize} / ${fieldSize});
    `

    const defaultStyle = {
        transition: `background 200ms ease-in`,
    }

    const transitionStyles = (state: string, prevColor: string, currColor: string) => {
        switch (state) {
            case "entering":
                return {background: prevColor}
            case "entered":
                return {background: currColor}
            case "exiting":
                return {background: currColor}
            case "exited":
                return {background: prevColor}
        }
    };

    function aroundCheck(aroundCell: Cell, curCell: Cell) {
        return (aroundCell !== undefined && ((aroundCell.captured && !curCell.captured)
            || (!aroundCell.captured && curCell.captured)
            || aroundCell.value !== curCell.value))
    }

    function borderClassesAroundCheck(cell: Cell, rowIndex: number, columnIndex: number): string[] {
        const classes: string[] = [];

        let row = map[rowIndex - 1]
        if (row != undefined && aroundCheck(row[columnIndex], cell)) {
            classes.push(styles.nonCapturedCellTop)
        }
        row = map[rowIndex + 1]
        if (row != undefined && aroundCheck(row[columnIndex], cell)) {
            classes.push(styles.nonCapturedCellBottom)
        }

        row = map[rowIndex]
        let column = row[columnIndex - 1]
        if (aroundCheck(column, cell)) {
            classes.push(styles.nonCapturedCellLeft)
        }

        column = row[columnIndex + 1]
        if (aroundCheck(column, cell)) {
            classes.push(styles.nonCapturedCellRight)
        }

        return classes;
    }

    const nodeRef = useRef(null);

    const [entered, setEntered] = useState(false);
    useEffect(() => {
        setEntered(true);
    }, [])

    return (
        <Transition
            nodeRef={nodeRef}
            timeout={200}
            in={entered}
        >
            {(state: string) => (
                <div>
                    <Cells className={`${styles.map} 
                `}
                           ref={nodeRef}>
                        {map.map(
                            (cellRow, rowIndex) =>
                                cellRow.map(
                                    (cell, columnIndex) =>
                                        <Cell
                                            key={rowIndex * fieldSize + columnIndex}
                                            className={`${borderClassesAroundCheck(cell, rowIndex, columnIndex).join(' ')}
                                            `}
                                            style={prevMap[rowIndex][columnIndex].value !== cell.value
                                                ?
                                                { ...defaultStyle, ...transitionStyles(state,
                                                        colors[prevMap[rowIndex][columnIndex].value].hexCode,
                                                        colors[cell.value].hexCode)}
                                                :
                                                {backgroundColor: colors[cell.value].hexCode}}/>
                                ))}
                    </Cells>
                </div>
            )}

        </Transition>
    );
});

export default Map;