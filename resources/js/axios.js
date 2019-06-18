import axios from "axios";

const token = localStorage.getItem("laravelMVCtoken") || null;

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 5000
});

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
