"use client";
import React from 'react';

type Props = {
    children: React.ReactNode
}

const Scrollable = ({children}: Props) => {
    return (
        <div style={{overflow: "auto", height: '10dvh'}}>
            {children}
        </div>
    );
};

export default Scrollable;