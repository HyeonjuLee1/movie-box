import axios from "axios";
import { API_SERVER_URI } from "./constants";

const axiosInst = axios.create({
  baseURL: API_SERVER_URI,
});

axiosInst.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWEwNDYwMWFjY2FkMTQ0ZGY1MTEwYjgwOTJjYWJhYSIsInN1YiI6IjY1MGU0YjYwMjE2MjFkMDEwYmI4YzI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kHZlV3XjFBZNmPrB_W_PIrla_zsuYGAVpKhflHdahZc";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, null);

export default axiosInst;
