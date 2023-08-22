import React, {useEffect, useState} from 'react';
import styles from "./repaintGameBannerPaintBrushTail.module.scss";
import styled from "styled-components";
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import {getRandomInt} from "@/l5_shared/util/random";
import {defaultColors} from "@/l5_shared/consts/repaint_game_settings";

const RepaintGameBannerPaintBrushTail = () => {

    const [map, setMap] = useState<number[][]>([])

    useEffect(() => {
        const newMap: number[][] = Array(3).fill(Array(3).fill(0))
            .map(arr => arr.map(
                    () => getRandomInt(0, 5)
                )
            );
        console.log(newMap)
        setMap(newMap)
    }, []);

    const blockSize = 32;

    const Map = styled.div`
      opacity: 1;
      filter: blur(20px);
      position: absolute;
      z-index: 2;

      display: flex;

      top: ${banner_sizes.height / 2 - 16 * 3}px;
      left: 1350px;

      width: ${blockSize}*3px;
      height: ${blockSize}*3px;
    `

    const Block = styled.div`
      width: ${blockSize}px;
      height: ${blockSize}px;
    `

    return (
        <div className={styles.tail}>
            <img
                src="/repaint_game_banner/tail.png"
                alt="tail"/>
            <Map>
                {map.map(arr => (
                    <div>
                        {arr.map(value =>
                            <Block style={{background: defaultColors[value].hexCode}}/>
                        )}
                    </div>
                ))}
            </Map>
        </div>
    );
};

export default RepaintGameBannerPaintBrushTail;