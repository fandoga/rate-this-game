"use client";

import debounce from "debounce";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/shared/utils/hooksRedux";
import { RawgGame } from "@/app/shared/types";
import {
  useLazyGetGameByIdQuery,
  useLazySearchGamesQuery,
} from "@/store/services/rawgApi";
import { rateSlice } from "@/store/reducers/rateSlice";

const Search = () => {
  const { setGame, setLastSearchQuery } = rateSlice.actions;
  const dispatch = useAppDispatch();
  const [trigger, { data, isFetching }] = useLazySearchGamesQuery();
  const [fetchGameById] = useLazyGetGameByIdQuery();
  const q = useAppSelector((s) => s.rateSlice.lastSearchQuery);
  const [currentGame, setCurrentGame] = useState<RawgGame>();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      inputRef.current?.focus();
    }
  }, [pathname]);

  const gamesList = useMemo(() => {
    const results = data?.results ?? [];

    return [...results].sort(
      (a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0),
    );
  }, [data]);

  const results = q ? gamesList : [];

  const handleSearch = (value: string) => {
    const qValue = value;

    dispatch(setLastSearchQuery(qValue));
    if (qValue.length > 0) {
      trigger({ query: qValue, page: 1, page_size: 20 });
    }
  };

  const getGame = (sel: RawgGame) => {
    setCurrentGame(sel);
    dispatch(setGame(sel));
    if (sel.id !== 0) {
      fetchGameById(sel.id);
    }
  };

  return (
    <div className="relative max-w-md w-full">
      <input
        ref={inputRef}
        aria-label="Поиск игры"
        className="transition-all w-full rounded-xl border border-default-200 bg-background px-4 py-2 outline-none hover:shadow-lg shadow-indigo-500/50"
        placeholder="Найти свою игру"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        value={q}
      />

      {q && (
        <div className="absolute z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-default-200 bg-content1 shadow-lg">
          {isFetching && (
            <div className="px-4 py-3 text-sm text-default-500">
              Подождите...
            </div>
          )}

          {!isFetching && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-default-500">
              Нечего показывать
            </div>
          )}

          {!isFetching &&
            results.map((game) => (
              <button
                key={game.id}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-default-100"
                type="button"
                onClick={() => {
                  getGame(game);
                  if (pathname !== "/") router.push("/");
                }}
              >
                <img
                  alt={game.name}
                  className="h-12 w-12 rounded object-cover"
                  src={game.background_image}
                />
                <span className="text-sm">{game.name}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
