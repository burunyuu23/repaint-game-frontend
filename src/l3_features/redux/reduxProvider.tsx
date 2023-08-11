"use client";
import React from 'react';
import {Provider} from "react-redux";
import {store} from "@/l3_features/redux/store";

type Props = {
    children: React.ReactNode
}

const ReduxProvider = ({children}: Props) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;