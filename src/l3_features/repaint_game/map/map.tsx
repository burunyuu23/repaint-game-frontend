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
      width: ${mapSize};
      height: ${mapSize};
    `

    const Cell = styled.div`
      width: ${mapSize} / ${fieldSize};
      height: ${mapSize} / ${fieldSize};
    `

    function borderClassesAroundCheck(cell: Cell, rowIndex: number, columnIndex: number): string[] {
        const classes: string[] = [];

        if (!cell.captured) {
            let row = map[rowIndex - 1]
            if (row !== undefined && (row[columnIndex].captured
                || row[columnIndex].value !== cell.value)) {
                classes.push(styles.nonCapturedCellTop)
            }
            row = map[rowIndex + 1]
            if (row !== undefined && row[columnIndex].captured) {
                classes.push(styles.nonCapturedCellBottom)
            }

            row = map[rowIndex]
            let column = row[columnIndex - 1]
            if (column !== undefined && (column.captured
                || column.value !== cell.value)) {
                classes.push(styles.nonCapturedCellLeft)
            }

            column = row[columnIndex + 1]
            if (column !== undefined && column.captured) {
                classes.push(styles.nonCapturedCellRight)
            }
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