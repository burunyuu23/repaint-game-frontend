import {useState} from "react";
import {AxiosError} from "axios";

type Return = {
    fetching: (...args: any[]) => Promise<void>,
    isLoading: boolean,
    error: string
}

export const useFetch = (callback: Function): Return => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (_e) {
            const e = _e as AxiosError
            // @ts-ignore
            setError(e.response?.data?.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 200);

            setTimeout(() => {
                setError('')
            }, 1000)
        }
    }

    return {fetching, isLoading, error}
}