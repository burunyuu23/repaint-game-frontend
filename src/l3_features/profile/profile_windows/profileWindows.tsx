"use client";

import React, {useState} from 'react';
import Windows from "@/l5_shared/lib/windows/windows";
import styles from "./profileWindows.module.scss"
import ConstructionIcon from '@mui/icons-material/Construction';
import {Title} from "@/l5_shared/types/title";

type Props = {}

const ProfileWindows = ({}: Props) => {
    const [mainSelected, setMainSelected] = useState<number>(0);
    const headers: Title[] = [
        {
            header: "Games",
            titles: ["TheRepaintingGame", "Chess", "[SECRET]"]
        },
        {
            header: "Society",
            titles: ["Liked", "Posts", "Comments"]
        },
        {
            header: "User",
            titles: ["Settings"]
        }
        ];

    const [repaintingGameSelected, setRepaintingGameSelected] = useState<number>(0);
    const repaintingGameHeaders = [
        {
            header: "Games history",
            titles: ["NonRating games", "Rating games"]
        },
        {
            header: "Stats",
            titles: ["Rating", "Palettes"]
        },];

    return (
        <Windows headers={headers}
                 selected={mainSelected}
                 setSelected={setMainSelected}
                 className={styles.firstWindows}>
            {mainSelected === 0 &&
                        <Windows headers={repaintingGameHeaders}
                                 selected={repaintingGameSelected}
                                 setSelected={setRepaintingGameSelected}
                                 className={styles.secondWindows}>
                            {repaintingGameSelected === 0 &&
                                <div>
                                    Нерейтинговые игры!
                                </div>
                            }
                            {repaintingGameSelected === 1 &&
                                <div>
                                    Рейтинговые игры!
                                </div>
                            }
                            {repaintingGameSelected === 2 &&
                                <div>
                                    Рейтинг!
                                </div>
                            }
                            {repaintingGameSelected === 3 &&
                                <div>
                                    Палетки!
                                </div>
                            }
                        </Windows>
                    }
                    {mainSelected === 1 &&
                        <div style={{display: "flex", alignItems: "center"}}>
                            <ConstructionIcon/> In progress...
                        </div>
                    }
                    {mainSelected === 2 &&
                        <div style={{display: "flex", alignItems: "center"}}>
                            In progress... <ConstructionIcon/>
                        </div>
                    }
        </Windows>
    );
};

export default ProfileWindows;