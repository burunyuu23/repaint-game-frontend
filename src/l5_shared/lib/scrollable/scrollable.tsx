"use client";
import React from 'react';

type Props = {
    children: React.ReactNode
}

const Scrollable = ({children}: Props) => {
    return (
        <div style={{overflow: "auto"}}>
            {children}
        </div>
    );
};

export default Scrollable;