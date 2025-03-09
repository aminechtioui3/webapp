import axios from "axios";
import Cookies from "js-cookie";
import { Properties } from 'src/properties';

const properties = Properties.getInstance();


const api = axios.create({
    baseURL: properties.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token"); // Read token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // ✅ Correct syntax
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 )) {
            // Redirect to login if unauthorized
              Cookies.remove("token");
             window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);

export default api;
