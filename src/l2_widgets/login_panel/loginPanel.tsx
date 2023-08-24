"use client";

import React, {useRef} from 'react';
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {Button, Stack, TextField} from "@mui/material";
import {UserLogin, UserLoginEmpty} from "@/l4_entities/user/models/user";

const LoginPanel = () => {

    const isOpen = useAppSelector(state => state.user__settings.isLoginOpen);

    const user = useRef<UserLogin>(UserLoginEmpty);

    const dispatch = useAppDispatch();
    const handleClose = () =>
        dispatch(UserSettingsSlice.actions.UpdateIsLoginOpen(false))

    return (
        <div>
            {isOpen &&
                <WhiteModalPanel handleClose={handleClose} title={"Login"}>
                    <Stack spacing={2}>
                        <TextField
                            id="outlined-password-input"
                            label="Username or Email"
                            onChange={(e) => {
                                user.current.email = e.target.value;
                                user.current.username = e.target.value;
                            }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            onChange={(e) => user.current.password = e.target.value}
                            autoComplete="current-password"
                        />
                        <Button onClick={() => console.log(user.current)}>Login</Button>
                    </Stack>
                </WhiteModalPanel>
            }
        </div>
    );
};

export default LoginPanel;