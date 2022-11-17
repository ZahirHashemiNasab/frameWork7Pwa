// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { AxioRequestBaseQuery } from "../requestBaseQuery";
import * as allUrl from "../url";

let basePath = process.env.REACT_APP_PUBLIC_URL as string;
export const KbComposition = createApi({
  reducerPath: "composition",
  baseQuery: AxioRequestBaseQuery({
    baseUrl: basePath,
  }),
  endpoints: (build) => ({
    getBusinessPerson: build.query({
      query: () => ({
        url: allUrl.PERSON_BUSINESS_URL,
        method: "get",
        headers: "",
      }),
    }),
  }),
});

export const { useGetBusinessPersonQuery } = KbComposition;
