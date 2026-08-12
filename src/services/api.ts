import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://llocalhost:8080',
});