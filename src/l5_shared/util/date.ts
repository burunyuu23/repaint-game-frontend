export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
}

export const formatDateTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const secs = date.getSeconds();

    return `${formatDate(date)}~${hours}:${minutes}:${secs}`;
}

export const timeRange = (from: Date, to: Date) => {
    const toTime = (new Date(to)).getTime();
    const fromTime = (new Date(from)).getTime();

    let range = (toTime - fromTime)/1000;
    
    return range.toFixed(2) + "c";
}