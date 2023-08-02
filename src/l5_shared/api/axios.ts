import axios from 'axios';

const api = axios.create({
    responseType: "json",
    headers: {
        'Content-Type': 'application/json',
    },
});


export default api;