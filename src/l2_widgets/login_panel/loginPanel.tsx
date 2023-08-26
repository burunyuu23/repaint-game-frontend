"use client";

import React, {useRef} from 'react';
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {Button, Stack, TextField} from "@mui/material";
import {UserLogin, UserLoginEmpty} from "@/l4_entities/user/models/user";
import {AddErrorCodeToKeys, generateErrorCodes} from "@/l5_shared/util/error_code";
import {createUseValidation} from "@/l5_shared/hooks/useValidation";

const LoginPanel = () => {

    const userLoginErrors = {
        usernameEmpty: "Username must be not empty",
        usernameTooLarge: "Username length must be less than 30",
        passwordEmpty: "Password must be not empty",
        passwordTooSmall: "Password length must be greater than 8",
    }
    type UserLoginErrorsWithErrorCodeKeys = AddErrorCodeToKeys<typeof userLoginErrors, number>;
    const registerErrorCodes = generateErrorCodes(userLoginErrors) as UserLoginErrorsWithErrorCodeKeys;

    const errorCode = useRef<number>(1)
    const useValidation = createUseValidation({
        errorCodes: registerErrorCodes,
        errorsMessages: userLoginErrors,
        errorCode
    })

    const [usernameErrorMsg, validateUsername] = useValidation({
        rules: [
            {
                rule: () => user.current.username.length <= 0,
                errorField: userLoginErrors.usernameEmpty
            },
            {
                rule: () => user.current.username.length > 30,
                errorField: userLoginErrors.usernameTooLarge
            }
        ]
    });

    const [passwordErrorMsg, validatePassword] = useValidation({
        rules: [
            {
                rule: () => user.current.password.length <= 0,
                errorField: userLoginErrors.passwordEmpty
            },
            {
                rule: () => user.current.password.length <= 8,
                errorField: userLoginErrors.passwordTooSmall
            },
        ],
    });

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

                            error={usernameErrorMsg !== ""}
                            helperText={usernameErrorMsg}

                            onChange={(e) => {
                                user.current.email = e.target.value;
                                user.current.username = e.target.value;
                                validateUsername()
                            }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"

                            error={passwordErrorMsg !== ""}
                            helperText={passwordErrorMsg}

                            onChange={(e) => {
                                user.current.password = e.target.value
                                validatePassword()
                            }}
                            autoComplete="current-password"
                        />
                        <Button onClick={() => {
                            validateUsername()
                            validatePassword()
                            console.log(user.current)
                        }}>Login</Button>
                    </Stack>
                </WhiteModalPanel>
            }
        </div>
    );
};

export default LoginPanel;