import { userStore } from "@/store/userStore";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = userStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Une erreur s'est produite.";

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Token expired, use refresh token");
      const refreshToken = userStore.getState().refreshToken;

      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/token/refresh/",
          { refresh: refreshToken }
        );

        const newAccess = data.access;
        userStore.setState({ token: newAccess });
        console.log("Used refresh token successfully");
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        userStore.getState().logout();
        toast.error("Session expirée, veuillez vous reconnecter.");
        return Promise.reject(error);
      }
    } else if (error.response?.status === 403) {
      toast.error("Accès non autorisé.");
      return Promise.reject(error);
    } else if (error.response?.status === 404) {
      toast.error("Page non trouvée.");
      return Promise.reject(error);
    } else {
      toast.error(message);
      return Promise.reject(error);
    }
  }
);

export default api;
