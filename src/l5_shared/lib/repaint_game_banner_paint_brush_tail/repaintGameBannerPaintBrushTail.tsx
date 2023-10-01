import React, {useEffect, useState} from 'react';
import styles from "./repaintGameBannerPaintBrushTail.module.scss";
import styled from "styled-components";
import {banner_sizes} from "@/l5_shared/consts/css/banner_size";
import {getRandomInt} from "@/l5_shared/util/random";
import {defaultColors} from "@/l5_shared/consts/repaint_game_settings";
import Image from "next/image";

const RepaintGameBannerPaintBrushTail = () => {

    const [map, setMap] = useState<number[][]>([])

    useEffect(() => {
        const newMap: number[][] = Array(3).fill(Array(3).fill(0))
            .map(arr => arr.map(
                    () => getRandomInt(0, 5)
                )
            );
        setMap(newMap)
    }, [setMap]);

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
            <Image
                src="/repaint_game_banner/tail.png"
                alt="tail"/>
            <Map>
                {map.map((arr, array_index) => (
                    <div key={array_index}>
                        {arr.map((value, index) =>
                            <Block key={index}
                                   style={{background: defaultColors[value].hexCode}}/>
                        )}
                    </div>
                ))}
            </Map>
        </div>
    );
};

export default RepaintGameBannerPaintBrushTail;