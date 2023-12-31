import React from 'react';
import {Metadata} from "next";
import Content from './content';

export const metadata: Metadata = {
    title: 'TheRepaintingGame',
    description: 'Repaint map and fun!',
    icons: {
        icon: '/icons/repaintGame.jpg',
    },
}

const Page = () => {
    return (
        <Content />
    );
};

export default Page;