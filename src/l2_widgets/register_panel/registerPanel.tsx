"use client";

import React, {useRef, useState} from 'react';
import {useAppSelector} from "@/l5_shared/hooks/useAppSelector";
import {useAppDispatch} from "@/l5_shared/hooks/useAppDispatch";
import UserSettingsSlice from "@/l3_features/redux/user_settings/reducer";
import WhiteModalPanel from "@/l3_features/white_modal_panel/whiteModalPanel";
import {Button, Stack, TextField} from "@mui/material";
import {UserRegister, UserRegisterEmpty} from "@/l4_entities/user/models/user";
import {formatDate} from "@/l5_shared/util/date";
import {AddErrorCodeToKeys, generateErrorCodes} from "@/l5_shared/util/error_code";
import {createUseValidation} from "@/l5_shared/hooks/useValidation";
import NoEncryptionIcon from '@mui/icons-material/NoEncryption';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import HttpsIcon from '@mui/icons-material/Https';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import styles from "./registerPanel.module.scss"

const RegisterPanel = () => {

    const userRegistryErrors = {
        usernameEmpty: "Username must be not empty",
        usernameTooLarge: "Username length must be less than 30",
        emailEmpty: "Email must be not empty",
        emailRegex: "Email have strange format",
        passwordEmpty: "Password must be not empty",
        passwordTooSmall: "Password length must be greater than 8",
        first_nameEmpty: "First name must be not empty",
        first_nameTooLarge: "First name length must be less than 30",
        last_nameEmpty: "Last name must be not empty",
        last_nameTooLarge: "Last name length must be less than 30",
        birthdateWrongRange: "You must be less than 150 years old and over -1",
        birthdateEmpty: "Date must be not empty"
    }
    type UserRegistryErrorsWithErrorCodeKeys = AddErrorCodeToKeys<typeof userRegistryErrors, number>;
    const registerErrorCodes = generateErrorCodes(userRegistryErrors) as UserRegistryErrorsWithErrorCodeKeys;

    const passwordDifficultRegistryErrors = {
        passwordEmpty: "Good password must be not empty",
        passwordTooSmall: "Great password length must be greater than 8",
        passwordHasNoVariety: "Excellent password must contains [0-9] and [a-zA-Z]",
        passwordHasNoSpecialChars: "Awesome password must have special chars like @ (bark!)",
    }
    type PasswordDifficultRegistryErrorsWithErrorCodeKeys = AddErrorCodeToKeys<typeof passwordDifficultRegistryErrors, number>;
    const passwordDifficultErrorCodes = generateErrorCodes(passwordDifficultRegistryErrors) as PasswordDifficultRegistryErrorsWithErrorCodeKeys;

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
            },
            {
                rule: () => {
                    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return !regex.test(user.current.email)
                },
                errorField: userRegistryErrors.emailRegex
            }
        ],
    });

    const [passwordErrorMsg, validatePassword] = useValidation({
        rules: [
            {
                rule: () => user.current.password.length <= 0,
                errorField: userRegistryErrors.passwordEmpty
            },
            {
                rule: () => user.current.password.length <= 8,
                errorField: userRegistryErrors.passwordTooSmall
            },
        ],
    });

    const usePasswordValidation = createUseValidation({
        registerErrorCodes: passwordDifficultErrorCodes,
        userRegistryErrors: passwordDifficultRegistryErrors
    })
    const [passwordIsInit, setPasswordIsInit] = useState<boolean>(false);
    const [passwordDifficultErrorMsg, validatePasswordDifficult] = usePasswordValidation({
        rules: [
            {
                rule: () => {
                    setPasswordIsInit(true)
                    return user.current.password.length <= 0
                },
                errorField: passwordDifficultRegistryErrors.passwordEmpty
            },
            {
                rule: () => user.current.password.length <= 8,
                errorField: passwordDifficultRegistryErrors.passwordTooSmall
            },
            {
                rule: () => {
                    const regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/
                    return !regex.test(user.current.password)
                },
                errorField: passwordDifficultRegistryErrors.passwordHasNoVariety
            },
            {
                rule: () => {
                    const regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+_)(*&^%$#@!}{\\><{\]\|\/:;,.`~'"]).*$/
                    return !regex.test(user.current.password)
                },
                errorField: passwordDifficultRegistryErrors.passwordHasNoSpecialChars
            }
        ],
    });

    const [first_nameErrorMsg, validateFirst_name] = useValidation({
        rules: [
            {
                rule: () => user.current.first_name.length <= 0,
                errorField: userRegistryErrors.first_nameEmpty
            },
            ]
    })

    const [last_nameErrorMsg, validateLast_name] = useValidation({
        rules: [
            {
                rule: () => user.current.last_name.length <= 0,
                errorField: userRegistryErrors.last_nameEmpty
            },
        ]
    })

    const [birthdateErrorMsg, validateBirthdate] = useValidation({
        rules: [
            {
                rule: () => {
                    const currentDate = new Date();
                    return user.current.birthdate.getTime() < (new Date(currentDate.getFullYear() - 150, currentDate.getMonth(), currentDate.getDate())).getTime() ||
                        user.current.birthdate.getTime() > (new Date()).getTime()
                },
                errorField: userRegistryErrors.birthdateWrongRange
            },
            {
                rule: () => isNaN(user.current.birthdate.getTime()),
                errorField: userRegistryErrors.birthdateEmpty
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
                        <Stack direction="row" className={styles.passwordWrapper}>
                            {
                                (passwordDifficultErrorMsg === passwordDifficultRegistryErrors.passwordEmpty || (passwordDifficultErrorMsg === "" && !passwordIsInit)) &&
                                <NoEncryptionIcon className={styles.noPassword}/>
                            }
                            {
                                passwordDifficultErrorMsg === passwordDifficultRegistryErrors.passwordTooSmall &&
                                <NoEncryptionGmailerrorredIcon className={styles.worstPassword}/>
                            }
                            {
                                passwordDifficultErrorMsg === passwordDifficultRegistryErrors.passwordHasNoVariety &&
                                <HttpsIcon className={styles.badPassword}/>
                            }
                            {
                                passwordDifficultErrorMsg === passwordDifficultRegistryErrors.passwordHasNoSpecialChars &&
                                <HttpsIcon className={styles.mediumPassword}/>
                            }
                            {
                                passwordDifficultErrorMsg === "" && passwordIsInit &&
                                <EnhancedEncryptionIcon className={styles.normalPassword}/>
                            }
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"

                                color={`${passwordDifficultErrorMsg === passwordDifficultRegistryErrors.passwordEmpty ? "error" :
                                    passwordDifficultErrorMsg !== "" ? "warning" :
                                        !passwordIsInit ? "info" : "success"}`}

                                error={passwordErrorMsg !== ""}
                                helperText={passwordErrorMsg !== "" ? passwordErrorMsg : passwordDifficultErrorMsg}

                                onChange={(e) => {
                                    user.current.password = e.target.value
                                    validatePassword()
                                    validatePasswordDifficult()
                                }}
                                autoComplete="current-password"
                            />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="first_name-input"
                                label="First name"

                                error={first_nameErrorMsg !== ""}
                                helperText={first_nameErrorMsg}

                                onChange={(e) => {
                                    user.current.first_name = e.target.value
                                    validateFirst_name()
                                }}
                            />
                            <TextField
                                id="last_name-input"
                                label="Last name"

                                error={last_nameErrorMsg !== ""}
                                helperText={last_nameErrorMsg}

                                onChange={(e) => {
                                    user.current.last_name = e.target.value
                                    validateLast_name()
                                }}
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
                            validateUsername()
                            validateEmail()
                            validatePassword()
                            validatePasswordDifficult()
                            validateFirst_name()
                            validateLast_name()
                            validateBirthdate()

                            console.log(errorCode.current)

                            if (errorCode.current === 1)
                                console.log("can register")
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