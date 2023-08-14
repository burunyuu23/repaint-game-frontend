import React from 'react';
import {Metadata} from "next";
import Content from './content';
import {fieldSizeDefault, fieldSizeMax, fieldSizeMin, maxRoundsDefault, maxRoundsMax, maxRoundsMin} from "@/l5_shared/lib/consts/consts";
import RepaintGameSettingsSlice, {RepaintGameSettings} from "@/l3_features/redux/repaint_game/settings_reducer";
import RepaintGameStateSlice from "@/l3_features/redux/repaint_game/state_reducer";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";

export const metadata: Metadata = {
    title: 'TheRepaintingGame',
    description: 'Repaint map and fun!',
}

const Page = () => {
    return (
        <Content />
    );
};

export default Page;