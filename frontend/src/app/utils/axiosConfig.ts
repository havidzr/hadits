import axios from "axios";

let BaseAPIURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3300";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_API_URL) {
    BaseAPIURL = "/api";
}

const axiosInstance = axios.create({
    baseURL: BaseAPIURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
