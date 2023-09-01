"use client";

import React, {useState} from 'react';
import Windows from "@/l5_shared/lib/windows/windows";

type Props = {
}

const ProfileWindows = ({}: Props) => {
    const [selected, setSelected] = useState<number>(0);
    return (
        <Windows titles={["Games", "Liked", "Posts", "Comments", "Settings"]}
                 selected={selected}
                 setSelected={setSelected}>
            {selected === 0 &&
                <div>
                    Игры!
                </div>
            }
        </Windows>
    );
};

export default ProfileWindows;