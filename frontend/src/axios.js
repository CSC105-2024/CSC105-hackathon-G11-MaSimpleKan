import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    withCredentials: true, // this one is for the "Authentication": "Bearer jwt"
})