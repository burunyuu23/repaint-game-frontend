"use client";
import React from 'react';
import LoginPanel from "@/l2_widgets/login_panel/loginPanel";
import RegisterPanel from "@/l2_widgets/register_panel/registerPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";

const Panels = () => {
    const isLoginOpen = useAppSelector(state => state.user__settings.isLoginOpen);
    const isRegisterOpen = useAppSelector(state => state.user__settings.isRegisterOpen);
    return (
        <div>
            {isLoginOpen &&
                <LoginPanel/>
            }
            {isRegisterOpen &&
                <RegisterPanel/>
            }
        </div>
    );
};

export default Panels;