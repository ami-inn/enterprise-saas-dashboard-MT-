// import axios, { AxiosError, AxiosInstance } from "axios";
// // import { toast } from "react-hot-toast";
// // import { DecryptToken } from "../utils/services/TokenHandle";
// // import type {
// //   DecryptedToken,
// //   RetryableAxiosRequestConfig,
// //   RootStateShape,
// //   TokenOwnerType,
// // } from "./axiosInstance.types";

// // import { UnAuthLogoutUser } from "../utils/services/localStorage/userToken";
// // import { DecryptToken } from "../utils/services/localStorage/EncryptTokens";
// // const BASE_URL = "http://47.237.112.217:7001/api/";

// const BASE_URL: string =
//   import.meta.env.VITE_APP_STAGE === "PRODUCTION"
//     ? "https:"
//     : // : "https:/"
//       "https";

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const axiosTokenInstance: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   async (config: RetryableAxiosRequestConfig) => {
//     const store = (await import("../base/store/store")).store;

//     const state = store.getState() as RootStateShape;

//     const token: DecryptedToken | null = config.url?.includes("user/")
//       ? await DecryptToken(state.auth.userTokens)
//       : null;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token.access}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as RetryableAxiosRequestConfig;
//     const userType: TokenOwnerType = originalRequest.url?.includes("user/")
//       ? "user"
//       : "";

//     if (error.message === "Network Error") {
//       // "enter heree", error;
//       console.log("Network error encountered", error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await refreshAccessToken(
//           originalRequest.url?.includes("user/") ? "user" : ""
//         );
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         if (userType === "user") {
//           toast.error("Session Expired! Please Login Again");
//           //   UnAuthLogoutUser();
//           window.location.reload();
//           //  commented it out
//         }

//         throw refreshError;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// const refreshAccessToken = async (type: TokenOwnerType): Promise<string | undefined> => {
//   try {
//     const store = (await import("../base/store/store")).store;

//     const state = store.getState() as RootStateShape;

//     // const token = type === "user" ? getDecryptedUserToken() : null;
//     const token: DecryptedToken | null =
//       type === "user" ? await DecryptToken(state.auth.userTokens) : null;

//     const response = await axiosTokenInstance.post("user/token/refresh/", {
//       refresh: token?.refresh,
//     });

//     const { access } = response.data;

//     if (type === "user") {
//       //  ('entere hereee on update access token');
//       // updateUserAccessTokenEncrypt(access);
//       //   store.dispatch(updateUserTokens(access));
//     } else {
//       //  ("enter on aces null");
//     }

//     return access;
//   } catch (error) {
//     console.log(error, "error");
//     throw error;
//   }
// };

// export default axiosInstance;