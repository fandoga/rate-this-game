import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RawgGame } from "@/types";
import { RawgPaginatedResponse } from "@/types";

const RAWG_BASE_URL = "https://api.rawg.io/api";
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY as string | undefined;

export const rawgApi = createApi({
  reducerPath: "rawgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RAWG_BASE_URL,
    prepareHeaders: (headers) => {
      // Nothing special needed here, but you could add auth headers if required
      return headers;
    },
    paramsSerializer: (params) => {
      const urlParams = new URLSearchParams();
      // Always include API key
      if (RAWG_API_KEY) {
        urlParams.set("key", RAWG_API_KEY);
      }
      Object.entries(
        params as Record<string, string | number | boolean | undefined>
      ).forEach(([k, v]) => {
        if (v !== undefined && v !== null) urlParams.set(k, String(v));
      });
      return urlParams.toString();
    },
  }),
  endpoints: (builder) => ({
    searchGames: builder.query<
      RawgPaginatedResponse<RawgGame>,
      { query: string; page?: number; page_size?: number }
    >({
      query: ({ query, page = 1, page_size = 20 }) => ({
        url: "games",
        params: { search: query, search_exact: true, page, page_size },
      }),
    }),
    getGameById: builder.query<RawgGame, number>({
      query: (id) => ({ url: `games/${id}` }),
    }),
  }),
});

export const {
  useSearchGamesQuery,
  useLazySearchGamesQuery,
  useGetGameByIdQuery,
} = rawgApi;
