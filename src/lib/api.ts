import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000";
const API = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;
      if (refresh) {
        try {
          const { data } = await axios.post(`${baseURL}/api/users/token/refresh/`, { refresh });
          const newAccess = data?.access;
          if (newAccess) {
            localStorage.setItem("access", newAccess);
            originalRequest.headers = originalRequest.headers || {};
            (originalRequest.headers as Record<string, string>)["Authorization"] = `Bearer ${newAccess}`;
            return API(originalRequest);
          }
        } catch { /* logout si quieres */ }
      }
    }
    return Promise.reject(error);
  }
);

export default API;
