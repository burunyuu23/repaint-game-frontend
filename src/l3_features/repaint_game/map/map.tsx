import React from 'react';
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styles from './map.module.scss';
import styled from "@emotion/styled";

type Props = {
    map: Cell[][],
    fieldSize: number,
    onclick: () => void,
    colors: Color[],
    mapSize: string
}
const Map = ({map, fieldSize, colors, mapSize}: Props) => {

    const Cells = styled.div`
      grid-template-columns: repeat(${fieldSize}, 1fr);
      width: max-content;
    `

    const Cell = styled.div`
      width: calc(${mapSize} / ${fieldSize});
      height: calc(${mapSize} / ${fieldSize});
    `

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

    return (
        <Cells className={styles.map}>
            {map.map(
                (cellRow, rowIndex) =>
                    cellRow.map(
                        (cell, columnIndex) =>
                            <Cell
                                key={rowIndex * fieldSize + columnIndex}
                                className={borderClassesAroundCheck(cell, rowIndex, columnIndex).join(' ')}
                                style={{backgroundColor: colors[cell.value].hexCode}}/>
                    ))}
        </Cells>
    );
};

export default Map;