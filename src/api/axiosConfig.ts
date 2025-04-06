import axios from "axios";
import Cookies from "js-cookie";
import { Properties } from 'src/properties';
// eslint-disable-next-line import/no-cycle
import { GymModel } from "../models/GymModel";

const properties = Properties.getInstance();
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: properties.baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        const selectedGym = getSelectedGymFromCookies();

        // Set Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Set gymId in custom header instead of cookie
        const gymId = selectedGym ? selectedGym.id : -1;
        config.headers.gymId = gymId.toString(); // 👈 Key change

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
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
