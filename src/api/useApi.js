import axios from "axios";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  removeCredentialID,
  removeIsUserLoggedIn,
} from "../auth/authClientStore";
import { refreshToken } from "./refreshToken";
import Bottleneck from "bottleneck";

console.log(import.meta.env.VITE_JIKAN_API_URL);

const sendJikanReq = axios.create({
  baseURL: import.meta.env.VITE_JIKAN_API_URL,
  timeout: 10000,
});

// Create a new limiter
export let limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests (e.g., 1/3 seconds per request)
  maxConcurrent: 1, // Maximum number of requests at once
  reservoir: 60, // Number of requests available per minute
  reservoirRefreshInterval: 60 * 1000, // Refresh rate for minute limit
  reservoirRefreshAmount: 60, // Number of requests to refill each minute
});

sendJikanReq.interceptors.request.use(
  (res) => {
    const counts = limiter.counts();

    console.log(counts);
    return Promise.resolve(res);
  },
  (err) => Promise.reject(err)
);

export const restartLimiter = () => {
  limiter.stop({ dropWaitingJobs: true });
  limiter = new Bottleneck({
    minTime: 1000, // Minimum time between requests (e.g., 1/3 seconds per request)
    maxConcurrent: 1, // Maximum number of requests at once
    reservoir: 60, // Number of requests available per minute
    reservoirRefreshInterval: 60 * 1000, // Refresh rate for minute limit
    reservoirRefreshAmount: 60, // Number of requests to refill each minute
  });
  limitedSendJikanReq = limiter.wrap(sendJikanReq);
};

// Wrap the axios request in the limiter
export let limitedSendJikanReq = limiter.wrap(sendJikanReq);

export const sendUnprotectedReq = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})

export const sendProtectedReq = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});
sendProtectedReq.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

sendProtectedReq.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log(err);
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      return refreshToken()
        .then((newAccessToken) => {
          console.log("newAccessToken: ", newAccessToken);
          sendProtectedReq.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          return sendProtectedReq(originalRequest);
        })
        .catch((err) => {
          removeAccessToken();
          removeRefreshToken();
          removeCredentialID();
          removeIsUserLoggedIn();
          alert("Your token has expired. Please login again");
          window.location.href = "/signin";
          return Promise.reject(err);
        });
    }
    return Promise.reject(err);
  }

  //   async (err) => {
  //     alert(err.response.status);
  //     const originalRequest = err.config;
  //     // If the response returns a 401, attempt to refresh the token
  //     if (err.response.status === 401 && !originalRequest._isRetry) {
  //       // _isRetry preventrs us from entering an endless cycle
  //       originalRequest._isRetry = true;
  //       try {
  //         const newAccessToken = await refreshToken();
  //         console.log("newAccessToken: ", newAccessToken);
  //         sendProtectedReq.defaults.headers.common["Authorization"] =
  //           `Bearer ${newAccessToken}`;
  //         return sendProtectedReq(originalRequest);
  //       } catch (err) {
  //         removeAccessToken();
  //         removeRefreshToken();
  //         removeCredentialID();
  //         removeIsUserLoggedIn();
  //         window.location.href = "/signin";
  //         return Promise.reject(err);
  //       }
  //     }
  //     return Promise.reject(err);
  //   }
);
