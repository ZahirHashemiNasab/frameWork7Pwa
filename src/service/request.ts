import axios from "axios";
// import { getGlobalState } from "../utilities/utilities";

export const request = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Application-Name": "KIAN_BUSINESS",
    "Accept-Language": "fa",
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  },
});

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error", error.response.status);
    if (error.response.status == "401") {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    }
    return Promise.reject(error);
  }
);
