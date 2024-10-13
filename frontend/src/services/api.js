import axios from "axios";
import router from '../router';

const api = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return error;
});

api.interceptors.response.use(response => {
    // console.log(response);
    
    return response;
}, error => {
    if (error.response && error.response.status === 403) {
        // Redireciona para a página de login
        // console.log('redirecionando');
        
        router.push('/login');
    }
    return error;
});


export default api