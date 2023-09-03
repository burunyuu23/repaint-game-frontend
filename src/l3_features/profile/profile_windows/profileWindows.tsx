"use client";

import React, {useEffect, useState} from 'react';
import Windows from "@/l5_shared/lib/windows/windows";
import styles from "./profileWindows.module.scss"
import ConstructionIcon from '@mui/icons-material/Construction';
import {Title} from "@/l5_shared/types/title";
import {NonRatingAuthService} from "@/l4_entities/repaint-game/nonrating-service/service";
import {NonRatingGame} from "@/l4_entities/repaint-game/models/game";
import {Page} from "@/l5_shared/types/requestParam";
import Pageable from "@/l5_shared/lib/pageable/pageable";

type Props = {
    userId: string
}

const ProfileWindows = ({userId}: Props) => {
    const default_main_selected = 7;
    const [mainSelected, setMainSelected] = useState<number>(default_main_selected);
    const headers: Title[] = [
        {
            header: "Games",
            titles: ["TheRepaintingGame", "Chess", "[SECRET]"]
        },
        {
            header: "Society",
            titles: ["Friends", "Liked", "Posts", "Comments"]
        },
        {
            header: "User",
            titles: ["About", "Settings"]
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

    const [nonRatingGames, setNonRatingGames] = useState<Page<NonRatingGame> | null>(null);

    const fetchUserGames = async (offset: number) => {
        setNonRatingGames(await NonRatingAuthService.userGames(
            {
                limit: 3,
                offset: offset
            }, userId));
    }

    useEffect(() => {
        fetchUserGames(0);
        console.log(nonRatingGames)
    }, []);

    return (
        <div className={styles.main}>
            {mainSelected !== 0 &&
                <Windows headers={headers}
                         selected={mainSelected}
                         setSelected={setMainSelected}
                         className={styles.firstWindows}>
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
                    {mainSelected === 7 &&
                        <div>
                            Обо мне!
                        </div>}
                </Windows>
            }
            {mainSelected === 0 &&
                    <Windows headers={repaintingGameHeaders}
                             selected={repaintingGameSelected}
                             setSelected={setRepaintingGameSelected}
                             className={styles.firstWindows}
                    back={() => setMainSelected(default_main_selected)}>
                        {repaintingGameSelected === 0 && nonRatingGames !== null &&
                            <Pageable onClick={(offset: number) => fetchUserGames(offset)}
                                      totalPages={nonRatingGames.totalPages}
                                      currentPage={nonRatingGames.pageable.pageNumber + 1}>
                                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, whiteSpace: "nowrap", }}>
                                    {nonRatingGames.content.map(game =>
                                        <div>
                                            {game.gameId}
                                        </div>)
                                    }
                                </div>
                            </Pageable>
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
        </div>
    );
};

export default ProfileWindows;