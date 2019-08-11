import axios from "axios";

const token = localStorage.getItem("laravelMVCtoken") || null;

const axiosInstance = axios.create({
    baseURL: `${process.env.MIX_APP_URL}/api/`,
    timeout: 5000
});

axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
