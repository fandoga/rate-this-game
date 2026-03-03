"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import debounce from "debounce";
import {
  ComponentPropsWithRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/shared/utils/hooksRedux";
import { RawgGame } from "@/app/shared/types";
import {
  useLazyGetGameByIdQuery,
  useLazySearchGamesQuery,
} from "@/store/services/rawgApi";
import { rateSlice } from "@/store/reducers/rateSlice";

type AutocompleteRef = ComponentPropsWithRef<typeof Autocomplete>["ref"];
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

  const handleSearch = debounce((value: string) => {
    const q = value.trim();

    dispatch(setLastSearchQuery(q));
    if (q.length > 0) {
      trigger({ query: q, page: 1, page_size: 20 });
    }
  }, 300);

  const getGame = (sel: RawgGame) => {
    setCurrentGame(sel);
    dispatch(setGame(sel));
    if (sel.id !== 0) {
      fetchGameById(sel.id);
    }
  };

  return (
    <Autocomplete
      ref={inputRef as AutocompleteRef}
      isClearable
      allowsEmptyCollection={true}
      aria-label="Поиск игры"
      className="transition-all max-w-md outline-none hover:shadow-lg rounded-xl shadow-indigo-500/50"
      isLoading={isFetching}
      items={results}
      listboxProps={{
        emptyContent: q ? "Нечего показывать" : "Подождите...",
      }}
      menuTrigger="input"
      placeholder="Найти свою игру"
      selectorIcon={""}
      type="text"
      onClear={() => {
        dispatch(setLastSearchQuery(""));
        dispatch(setGame({ name: "" }));
      }}
      onInputChange={handleSearch}
      onSelectionChange={(val) => {
        const selected = gamesList.find((g) => String(g.id) === String(val));

        if (selected) getGame(selected);
        if (pathname !== "/") router.push("/");
      }}
    >
      {(game) => (
        <AutocompleteItem key={game.id} textValue={game.name}>
          <div className="flex gap-2 items-center">
            <img
              alt={game.name}
              className="w-16 h-16 object-cover rounded"
              src={game.background_image}
            />
            <div className="flex flex-col">
              <span className="text-small">{game.name}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default Search;
