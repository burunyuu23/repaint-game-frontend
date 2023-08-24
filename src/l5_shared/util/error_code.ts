import {generatePrimes} from "@/l5_shared/util/prime_numbers";

type AddErrorCodeToKey<T extends string | number | bigint | boolean | null | undefined> = `${T}ErrorCode`;

export type AddErrorCodeToKeys<T, M> = {
    [K in keyof T as AddErrorCodeToKey<K & string>]: M
};

export const generateErrorCodes = (from: Object) => {
    const obj: { [key: string]: number } = {}
    const primes = generatePrimes(Object.keys(from).length);
    Object.keys(from).forEach((key, index) => {
        obj[`${key}ErrorCode`] = primes[index];
    });

    return obj as unknown;
}