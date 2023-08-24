export function generatePrimes(n: number) {
    const primes = [];
    let num = 2;

    while (primes.length < n) {
        let isPrime = true;

        for (let i = 0; i < primes.length; i++) {
            if (num % primes[i] === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            primes.push(num);
        }

        num++;
    }

    return primes;
}