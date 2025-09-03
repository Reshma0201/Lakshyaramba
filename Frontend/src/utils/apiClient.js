// utils/apiClient.js
import axios from "axios";
import useAuthStore from "../stores/authStore.jsx";

const apiClient = axios.create({ baseURL: "http://localhost:8000/api" });

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
