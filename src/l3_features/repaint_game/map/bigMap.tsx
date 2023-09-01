import React, {NamedExoticComponent, useMemo} from 'react';
import {Cell} from "@/l4_entities/repaint-game/models/cell";
import {Color} from "@/l4_entities/repaint-game/models/color";
import styles from './map.module.scss';
import styled from "@emotion/styled";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";

type Props = {
    colors: Color[],
    mapSize: string,
}
const BigMap = ({colors, mapSize}: Props) => {

    const map = useAppSelector(state => state.repaint_game__state.gameSettings!.map)
    const fieldSize = useAppSelector(state => state.repaint_game__settings.fieldSize)

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

    type MemoizedCellsProps = {
        map: Cell[][]
    }

    const MemoizedCells: NamedExoticComponent<MemoizedCellsProps> = React.memo(({map}) => {
        return (
            <div>
                <Cells className={`${styles.map}`}>
                    {map.map((cellRow, rowIndex) =>
                        cellRow.map((cell, columnIndex) => (
                            <Cell
                                key={rowIndex * fieldSize + columnIndex}
                                style={{ backgroundColor: colors[cell.value].hexCode }}
                            />
                        ))
                    )}
                </Cells>
            </div>
        );
    });

    const MemoizedCellsElement = useMemo(() => {
        return <MemoizedCells map={map}/>;
    }, [map]);

    return (
        <div>
            {MemoizedCellsElement}
        </div>
    );
};

export default BigMap;