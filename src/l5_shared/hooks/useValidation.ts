import {MutableRefObject, useState} from "react";
import {getFieldName} from "@/l5_shared/util/get_field_name";

type Rule = {
    rule: () => boolean,
    errorField: string,
}

type UseValidationProps = {
    rules: Rule[],
    registerErrorCodes: { [key: string]: number },
    userRegistryErrors: { [key: string]: string },
    errorCode: React.MutableRefObject<number>
}
const validateError = (error: boolean, fieldErrorCode: number, errorCode: MutableRefObject<number>) =>{
    if (error) {
        if (errorCode.current % fieldErrorCode !== 0)
            errorCode.current *= fieldErrorCode
        return true
    } else if (!error && errorCode.current % fieldErrorCode === 0)
        errorCode.current /= fieldErrorCode
    return false
}

export const useValidation = ({rules, registerErrorCodes, userRegistryErrors, errorCode}: UseValidationProps): Return => {
    const [errorMsg, setErrorMsg] = useState<string>("")

    const validate = () => {
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i]
            const field = getFieldName(userRegistryErrors, rule.errorField);
            if (field !== undefined && validateError(rule.rule(), registerErrorCodes[`${field}ErrorCode`], errorCode))
                return setErrorMsg(userRegistryErrors[`${field}`])
        }
        return setErrorMsg("")
    }

    return [errorMsg, validate]
}

type Return = [
    errorMsg: string,
    validate: () => void
]

type CreateUseValidationProps = Omit<UseValidationProps, "rules">
type UseValidationClosureProps = Pick<UseValidationProps, "rules">
export const createUseValidation = (
    {
        registerErrorCodes,
        userRegistryErrors,
        errorCode
    } : CreateUseValidationProps
) => ({rules}: UseValidationClosureProps): Return => useValidation({rules, registerErrorCodes, userRegistryErrors, errorCode});