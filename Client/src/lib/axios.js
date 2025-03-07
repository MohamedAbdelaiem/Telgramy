import axios from 'axios';



const instance = axios.create({
    baseURL: import.meta.env.MODE === 'development' 
        ? 'http://localhost:3000/api' 
        : `${window.location.origin}/api`, // Use window.location.origin correctly
    withCredentials: true
});


export default instance;