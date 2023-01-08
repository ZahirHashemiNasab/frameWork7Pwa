import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import { store } from "../store/store";
// import { refreshToken } from "./auth";
import { request } from "./request";
import { getGlobalState } from "../utilities/utilities";
import axios from "axios";
import { refreshToken } from "./refreshToken";
export const AxioRequestBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): any =>
  async ({ url, method, data, params }: any) => {
    let headers = {};
    // if (localStorage.getItem("ACCESS_TOKEN") !== null) {
    return request(baseUrl + url, {
      method: method,
      data: data,
      params: params,
      headers: {
        ...headers,
      },
    })
      .then((resp: any) => {
        return { data: resp.data };
      })
      .catch((error: any) => {
        // refreshToken(
        //   request(baseUrl + url, {
        //     method: method,
        //     data: data,
        //     params: params,
        //     headers: {
        //       ...headers,
        //     },
        //   })
        // )
        //   .then((resp: any) => {
        //     data: resp;
        //   })
        //   .catch((error: any) => {
        //     error: error;
        //   });
        refreshToken(
          request(baseUrl + url, {
            method: method,
            data: data,
            params: params,
            headers: {
              ...headers,
            },
          })
        );
        return { error: error };
      });
  };
