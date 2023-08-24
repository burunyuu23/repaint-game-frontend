export function getFieldName(obj: { [key: string]: string }, fieldName: string) {
    try {
        for (const key in obj) {
            if (obj[key] === fieldName) {
                return key;
            }
        }
    } catch (e) {
        console.error(e)
    }
}