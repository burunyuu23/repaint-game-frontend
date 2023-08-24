"use client";

import React, {useRef} from 'react';
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import {Button, Stack, TextField} from "@mui/material";
import {UserRegister, UserRegisterEmpty} from "@/l4_entities/user/models/user";
import {formatDate} from "@/l5_shared/util/date";
import {AddErrorCodeToKeys, generateErrorCodes} from "@/l5_shared/util/error_code";
import {createUseValidation} from "@/l5_shared/hooks/useValidation";

const RegisterPanel = () => {

    // const UserRegistryErrors = {...UserRegisterEmpty, emailRegex: ""}
    const userRegistryErrors = {
        usernameEmpty: "Username must be not empty",
        usernameTooLarge: "Username length must be less than 30",
        emailEmpty: "Email must be not empty",
        emailRegex: "Email have strange format",
        passwordTooSmall: "Password length be greater than 8",
        passwordTooLarge: "Password length be less than 30",
        first_nameEmpty: "First name must be not empty",
        first_nameTooLarge: "First name length must be less than 30",
        last_nameEmpty: "Last name must be not empty",
        last_nameTooLarge: "Last name length must be less than 30",
        birthdateWrongRange: "You must be less than 150 years old and over -1"
    }
    type UserRegistryErrorsWithErrorCodeKeys = AddErrorCodeToKeys<typeof userRegistryErrors, number>;
    const registerErrorCodes = generateErrorCodes(userRegistryErrors) as UserRegistryErrorsWithErrorCodeKeys;

    const isOpen = useAppSelector(state => state.user__settings.isRegisterOpen);

    const user = useRef<UserRegister>(UserRegisterEmpty)

    const dispatch = useAppDispatch();
    const handleClose = () =>
        dispatch(UserSettingsSlice.actions.UpdateIsRegisterOpen(false))

    const errorCode = useRef<number>(1)
    const useValidation = createUseValidation({registerErrorCodes, userRegistryErrors, errorCode})

    const [usernameErrorMsg, validateUsername] = useValidation({
        rules: [
            {
                rule: () => user.current.username.length <= 0,
                errorField: userRegistryErrors.usernameEmpty
            },
            {
                rule: () => user.current.username.length > 30,
                errorField: userRegistryErrors.usernameTooLarge
            }
        ]
    });

    const [emailErrorMsg, validateEmail] = useValidation({
        rules: [
            {
                rule: () => user.current.email.length <= 0,
                errorField: userRegistryErrors.emailEmpty
            }
        ],
    });

    const [birthdateErrorMsg, validateBirthdate] = useValidation({
        rules: [
            {
                rule: () => {
                    const currentDate = new Date();
                    return user.current.birthdate.getTime() < (new Date(currentDate.getFullYear() - 150, currentDate.getMonth(), currentDate.getDate())).getTime() ||
                        user.current.birthdate.getTime() > (new Date()).getTime()
                },
                errorField: userRegistryErrors.birthdateWrongRange
            }
        ],
    });

    return (
        <div>
            {isOpen &&
                <WhiteModalPanel handleClose={handleClose} title={"Register"}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="username-input"
                                label="Username"

                                error={usernameErrorMsg !== ""}
                                helperText={usernameErrorMsg}

                                onChange={(e) => {
                                    user.current.username = e.target.value;
                                    validateUsername()
                                }}
                            />
                            <TextField
                                id="email-input"
                                label="Email"

                                error={emailErrorMsg !== ""}
                                helperText={emailErrorMsg}

                                onChange={(e) => {
                                    user.current.email = e.target.value
                                    validateEmail()
                                }}
                            />
                        </Stack>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            onChange={(e) => user.current.password = e.target.value}
                            autoComplete="current-password"
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="first_name-input"
                                label="First name"
                                onChange={(e) => user.current.first_name = e.target.value}
                            />
                            <TextField
                                id="last_name-input"
                                label="Last name"
                                onChange={(e) => user.current.last_name = e.target.value}
                            />
                        </Stack>
                        <TextField
                            id="birthdate-input"
                            label="Birthdate"
                            type={"date"}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    min: (() => {
                                        const currentDate = new Date();
                                        return formatDate(new Date(currentDate.getFullYear() - 150, currentDate.getMonth(), currentDate.getDate()));
                                    })(),
                                    max: formatDate(new Date()),
                                },
                            }}
                            defaultValue={formatDate(user.current.birthdate)}

                            error={birthdateErrorMsg !== ""}
                            helperText={birthdateErrorMsg}

                            onChange={(e) => {
                                user.current.birthdate = new Date(e.target.value)
                                validateBirthdate()
                            }}
                        />
                        <Button onClick={() => {
                            console.log(errorCode.current)
                            console.log(user)
                            validateUsername()
                            validateEmail()
                            validateBirthdate()

                            console.log(errorCode.current)
                            console.log(user)
                        }}>
                            Register
                        </Button>
                    </Stack>
                </WhiteModalPanel>
            }
        </div>
    );
};

export default RegisterPanel;