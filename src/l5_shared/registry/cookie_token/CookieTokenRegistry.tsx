'use client'

import React, {useEffect, useState} from 'react'
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {get_is_token_active, refresh_token} from "@/l5_shared/util/cookie_worker";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {Timeout} from "@react-spring/rafz";

export default function CookieTokenRegistry({
                                                children,
                                            }: {
    children: React.ReactNode
}) {

    const isAuth = useAppSelector(state => state.user__settings.isAuth)
    const dispatch = useAppDispatch();

    const checkToken = () => {
        console.log("interval!")
        refresh_token();
        dispatch(UserSettingsSlice.actions.UpdateIsAuth(get_is_token_active()))
    }

    useEffect(() => {
        checkToken();
        const interval = setInterval(() => {
            checkToken();
        }, 1500*1000)
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}