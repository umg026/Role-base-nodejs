import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "http://localhost:1201/api",
    withCredentials : true
})