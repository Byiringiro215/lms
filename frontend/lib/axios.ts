import axios  from 'axios';
import { apiBaseUrl } from './constants';
import { json } from 'stream/consumers';
export const api=axios.create({
    baseURL:apiBaseUrl,
    headers:{
        'Content-Type':'application/json',
    }
})