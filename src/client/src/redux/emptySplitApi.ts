import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { acquireAccessToken } from "../Features/Auth/AcquireToken";
import { msalInstance } from "../main";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7099",
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = await acquireAccessToken(msalInstance);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
