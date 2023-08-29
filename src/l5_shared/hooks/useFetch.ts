
import {AxiosError} from "axios";
import {useState} from "react";

type Return = {
    fetching: (...args: any[]) => Promise<void>,
    isLoading: boolean,
    error: string,
    clearError?: () => void
}

export const useFetch = (callback: Function): Return => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const clearError = () => {
        setError('')
    }

    const fetching = async (...args: any[]) => {
        try {
            clearError()
            setIsLoading(true)
            await callback(...args)
        } catch (_e) {
            const e = _e as AxiosError
            if (e.response?.status === 401)
                setError('You must be authorized before do it!');
            else {
                // @ts-ignore
                setError(e.response?.data?.message);
            }

        } finally {
            setIsLoading(false)
        }
    }

    return {fetching, isLoading, error, clearError}
}