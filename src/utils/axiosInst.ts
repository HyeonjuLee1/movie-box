import axios from "axios";
import { API_SERVER_URI } from "./constants";

const axiosInst = axios.create({
  baseURL: API_SERVER_URI,
});

axiosInst.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_API_KEY
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, null);

export default axiosInst;
