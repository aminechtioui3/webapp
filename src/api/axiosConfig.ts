import axios from "axios";
import Cookies from "js-cookie";
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-cycle
import {GymModel} from "../models/GymModel";
// eslint-disable-next-line import/no-cycle


const properties = Properties.getInstance();

const api = axios.create({
    baseURL: properties.baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Retrieve token and selectedGym from cookies
        const token = Cookies.get("token");
        const selectedGym =getSelectedGymFromCookies();

        console.log(token);
        console.log(config.url);
        // Set Authorization header if token is found
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }


        // Set gymId to the value of selectedGym or -1 if not found
        const gymId = selectedGym ? selectedGym.id : -1;
       // config.headers.Cookie = `gymId=${gymId}`;
        Cookies.set("gymId", gymId.toString(), {
            expires: 7,
            secure: true,
            sameSite: "None",
        });

        console.log(gymId);
        console.log(config.headers);
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(

    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login if unauthorized
            Cookies.remove("token");
            window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);

function getSelectedGymFromCookies(): GymModel {
    const selectedGymJson = Cookies.get('selectedGym');
    if (selectedGymJson) {
        return GymModel.fromJson(JSON.parse(selectedGymJson));
    }

    return new GymModel({ id: -1, name: "Select a gym" });
}

export default api;
