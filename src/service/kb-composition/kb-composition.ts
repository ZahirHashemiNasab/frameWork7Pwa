import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AxioRequestBaseQuery } from "../requestBaseQuery";
import * as allUrl from "../url";

const basePath = process.env.REACT_APP_PUBLIC_URL as string;
export const KbComposition = createApi({
  reducerPath: "composition",
  baseQuery: AxioRequestBaseQuery(),
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
