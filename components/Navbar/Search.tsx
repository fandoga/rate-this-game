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
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<RawgGame>();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      inputRef.current?.focus();
    }
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      if (!el.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const gamesList = useMemo(() => {
    const results = data?.results ?? [];

    return [...results].sort(
      (a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0),
    );
  }, [data]);

  const results = q ? gamesList : [];

  const debouncedSearch = useMemo(() => {
    return debounce((qValue: string) => {
      dispatch(setLastSearchQuery(qValue));

      if (qValue.length > 0) {
        trigger({ query: qValue, page: 1, page_size: 20 });
      }
    }, 300);
  }, [dispatch, trigger, setLastSearchQuery]);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    const next = value;

    setInputValue(next);
    setIsOpen(true);
    debouncedSearch(next.trim());
  };

  const getGame = (sel: RawgGame) => {
    setCurrentGame(sel);
    dispatch(setGame(sel));
    if (sel.id !== 0) {
      fetchGameById(sel.id);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-md w-full">
      <input
        ref={inputRef}
        aria-label="Поиск игры"
        className="transition-all w-full rounded-xl border border-default-200 bg-background px-4 py-2 outline-none hover:shadow-lg shadow-indigo-500/50"
        placeholder="Найти свою игру"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
            (e.target as HTMLInputElement).blur();
          }
        }}
        value={inputValue}
      />

      {isOpen && q && (
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
                className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left hover:bg-default-100"
                type="button"
                onClick={() => {
                  getGame(game);
                  setIsOpen(false);
                  inputRef.current?.blur();
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
