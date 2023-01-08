import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AxioRequestBaseQuery } from "../requestBaseQuery";
import * as allUrl from "../url";

const basePath = process.env.REACT_APP_PUBLIC_URL as string;
export const KbKartable = createApi({
  reducerPath: "kartable",
  baseQuery: AxioRequestBaseQuery(),
  endpoints: (build) => ({
    getOrderByBusinessId: build.mutation({
      query: ({ page, businessId, config }) => {
        console.log("query", businessId);
        return {
          url:
            allUrl.ORDER_BY_BUSINESS_ID +
            `?page=${page}&size=10&businessId=${businessId}${config}`,
          method: "get",
          headers: "",
        };
      },
    }),
  }),
});

export const { useGetOrderByBusinessIdMutation } = KbKartable;
