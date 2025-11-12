import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RawgGame } from "@/types";
import { RawgPaginatedResponse } from "@/types";

const RAWG_BASE_URL = "https://api.rawg.io/api";
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY as string | undefined;

if (!RAWG_API_KEY) {
  // Warn once at startup so it's obvious during development
  // Requests will return 401 without a valid API key
  // eslint-disable-next-line no-console
  console.warn(
    "[rawgApi] NEXT_PUBLIC_RAWG_API_KEY is not set. RAWG requests will be unauthorized (401)."
  );
}

export const rawgApi = createApi({
  reducerPath: "rawgApi",
  baseQuery: (() => {
    const rawBaseQuery = fetchBaseQuery({ baseUrl: RAWG_BASE_URL });
    const baseQueryWithKey: BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError
    > = async (args, api, extraOptions) => {
      const argsObj: FetchArgs =
        typeof args === "string" ? { url: args } : { ...args };

      // Merge API key into query params
      argsObj.params = {
        ...(argsObj.params as Record<string, unknown> | undefined),
        ...(RAWG_API_KEY ? { key: RAWG_API_KEY } : {}),
      };

      return rawBaseQuery(argsObj, api, extraOptions);
    };
    return baseQueryWithKey;
  })(),
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
  useLazyGetGameByIdQuery,
} = rawgApi;
