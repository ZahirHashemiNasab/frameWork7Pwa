import axios from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Application-Name": "KIAN_BUSINESS",
    "Accept-Language": "fa",
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
    return Promise.reject(error);
  }
);

//   console.log("request", asyncRequest);
//   return asyncRequest;
// };