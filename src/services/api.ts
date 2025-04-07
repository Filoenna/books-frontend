import axios from 'axios';

const apiUrl = "http://127.0.0.1:8000/api";


// Create an Axios instance with a dynamic base URL
const api = axios.create({
    baseURL: apiUrl,  // Dynamically get backend URL from .env
});

// Now, you can use 'api' for making requests
export default api;