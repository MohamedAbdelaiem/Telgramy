import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.MODE==='development'?'http://localhost:3000/api':"https://tlgram-ddoouxioc-mohamedabdelaiems-projects.vercel.app/api",
    withCredentials: true
});

export default instance;