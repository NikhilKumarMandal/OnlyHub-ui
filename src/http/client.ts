import axios from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json",
        Accept: "application/json"
    }
})


// const refreshToken = () => api.post("/api/v1/auth/refresh");

const refreshToken = async () => {
    await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );
};

