"use client";

import React, {useRef} from 'react';
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import {Button, Stack, TextField} from "@mui/material";
import {UserLogin, UserLoginEmpty} from "@/l4_entities/user/models/user";
import {AddErrorCodeToKeys, generateErrorCodes} from "@/l5_shared/util/error_code";
import {createUseValidation} from "@/l5_shared/hooks/useValidation";
import {cookie_set_token} from "@/l5_shared/util/cookie_worker";
import {AuthService} from "@/l4_entities/user/auth-service/service";

const LoginPanel = () => {

    const userLoginErrors = {
        usernameEmpty: "Username must be not empty",
        usernameTooLarge: "Username length must be less than 30",
        usernameWrong: "Incorrect username or email",
        passwordEmpty: "Password must be not empty",
        passwordTooSmall: "Password length must be greater than 8",
        passwordWrong: "Incorrect password",
    }
    type UserLoginErrorsWithErrorCodeKeys = AddErrorCodeToKeys<typeof userLoginErrors, number>;
    const registerErrorCodes = generateErrorCodes(userLoginErrors) as UserLoginErrorsWithErrorCodeKeys;

    const errorCode = useRef<number>(1)
    const useValidation = createUseValidation({
        errorCodes: registerErrorCodes,
        errorsMessages: userLoginErrors,
        errorCode
    })

    const loginException = useRef<string>("")
    const [usernameErrorMsg, validateUsername] = useValidation({
        rules: [
            {
                rule: () => user.current.username.length <= 0,
                errorField: userLoginErrors.usernameEmpty
            },
            {
                rule: () => user.current.username.length > 30,
                errorField: userLoginErrors.usernameTooLarge
            },
            {
                rule: () => loginException.current === userLoginErrors.usernameWrong,
                errorField: userLoginErrors.usernameWrong
            },
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
            {
                rule: () => loginException.current === userLoginErrors.passwordWrong,
                errorField: userLoginErrors.passwordWrong
            },
        ],
    });

    const user = useRef<UserLogin>({...UserLoginEmpty});

    const dispatch = useAppDispatch();


    const handleClose = () =>
        dispatch(UserSettingsSlice.actions.UpdateIsLoginOpen(false))


    return (
        <WhiteModalPanel handleClose={handleClose} title={"Login"}>
            <Stack spacing={2}>
                <TextField
                    id="outlined-password-input"
                    label="Username or Email"

                    error={usernameErrorMsg !== " "}
                    helperText={usernameErrorMsg}

                    onChange={(e) => {
                        user.current.email = e.target.value;
                        user.current.username = e.target.value;
                        loginException.current = ""
                        validateUsername()
                    }}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"

                    error={passwordErrorMsg !== " "}
                    helperText={passwordErrorMsg}

                    onChange={(e) => {
                        user.current.password = e.target.value
                        loginException.current = ""
                        validatePassword()
                    }}
                    autoComplete="current-password"
                />
                <Button onClick={() => {
                    validateUsername()
                    validatePassword()

                    if (errorCode.current === 1) {
                        AuthService.login(user.current)
                            .then(resp => {
                                console.log(resp)
                                cookie_set_token(resp)
                                dispatch(UserSettingsSlice.actions.UpdateIsAuth(true))

                                handleClose();
                            })
                            .catch(e => {
                                console.log(e)
                                loginException.current = e.response.data.message
                                validateUsername()
                                validatePassword()
                            })
                    }
                }}>Login</Button>
            </Stack>
        </WhiteModalPanel>
    );
};

export default LoginPanel;