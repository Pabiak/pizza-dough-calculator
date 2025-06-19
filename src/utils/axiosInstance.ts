import axios from "axios";
import { getCookie, setCookie } from "@/helpers/cookies";
import logOut from "@/helpers/logOut";
import COOKIES from "@/types/enums/cookies";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = config;
    const accessToken = getCookie(COOKIES.ACCESS_TOKEN);

    if (accessToken) {
      updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return updatedConfig;
  },
  (error) => Promise.reject(error),
);

const getRefreshToken = () =>
  new Promise((resolve, reject) => {
    const refreshToken = getCookie(COOKIES.REFRESH_TOKEN);
    if (!refreshToken) {
      logOut();
      reject(new Error("No refresh token found"));
    }
    axiosInstance
      .post(`${import.meta.env.VITE_BACKEND_URL}/refresh-token/`, {
        refresh_token: refreshToken,
      })
      .then((response) => {
        const { access_token, refresh_token } = response.data;
        if (access_token && refresh_token) {
          setCookie(
            COOKIES.ACCESS_TOKEN,
            access_token,
            import.meta.env.VITE_COOKIE_ACCESS_TOKEN_EXPIRY,
          );
          setCookie(
            COOKIES.REFRESH_TOKEN,
            refresh_token,
            import.meta.env.VITE_COOKIE_REFRESH_TOKEN_EXPIRY,
          );
          return resolve(access_token);
        }
        logOut();
        return reject(new Error("No access token found"));
      })
      .catch(() => {
        logOut();
        reject(new Error("Error refreshing token"));
      });
  });

createAuthRefreshInterceptor(axiosInstance, getRefreshToken, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default axiosInstance;
