import axios from "axios";
import {
  decreaseRequestCount,
  increaseRequestCount,
} from "../../store/loadingSlice";
import { store } from "../../store/configureStrore";
import TokenService from "../../services/TokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  let token = TokenService.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  store.dispatch(increaseRequestCount());
  return config;
});

axios.interceptors.response.use(
  (response) => {
    store.dispatch(decreaseRequestCount());
    return response;
  },
  (error) => {
    store.dispatch(decreaseRequestCount());
  }
);

export default axiosInstance;
