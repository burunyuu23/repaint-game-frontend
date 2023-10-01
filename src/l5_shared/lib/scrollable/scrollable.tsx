"use client";
import React from 'react';
import styles from "./scrollable.module.scss"

type Props = {
    children: React.ReactNode,
    className?: string,
}

const Scrollable = ({children, className}: Props) => {
    return (
        <div className={className ? className : ""} style={{overflow: "auto"}}>
            {children}
        </div>
    );
};

export default Scrollable;