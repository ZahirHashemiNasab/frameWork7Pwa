import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";
import { store } from "../store1/store";
import { refreshToken } from "./auth";
import { request } from "./request";
import { getGlobalState } from "../utilities/utilities";
export const AxioRequestBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    let headers = {};
    if (getGlobalState().counter.TOKEN) {
      return request({
        method: method,
        url: baseUrl + url,
        data: data,
        params: params,
        headers: {
          ...headers,
          Authorization: `Bearer ${getGlobalState().counter.TOKEN}`,
        },
      })
        .then((resp: any) => {
          return resp;
        })
        .catch((error: any) => {
          refreshToken()
            .then((resp) => {
              request({
                method: method,
                url: baseUrl + url,
                data: data,
                params: params,
                headers: {
                  ...headers,
                  Authorization: `Bearer ${getGlobalState().counter.TOKEN}`,
                },
              });
            })
            .catch((error) => console.log("get error after refresh token"));
        });
    } else {
      return new Error("null token");
    }
  };
