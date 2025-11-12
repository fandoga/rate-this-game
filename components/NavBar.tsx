"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Chip,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  useLazySearchGamesQuery,
  useLazyGetGameByIdQuery,
} from "@/store/services/rawgApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import debounce from "debounce";
import { RawgGame } from "@/types";

const NavBar = () => {
  const { setGame, setLastSearchQuery } = rateSlice.actions;
  const dispatch = useAppDispatch();
  const [trigger, { data, isFetching }] = useLazySearchGamesQuery();
  const [fetchGameById] = useLazyGetGameByIdQuery();
  const q = useAppSelector((s) => s.rateSlice.lastSearchQuery);
  const [currentGame, setCurrentGame] = useState<RawgGame>();

  const gamesList = useMemo(() => {
    const results = data?.results ?? [];
    return [...results].sort(
      (a, b) => (b.ratings_count ?? 0) - (a.ratings_count ?? 0)
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
    // Optimistically set selected summary
    setCurrentGame(sel);
    dispatch(setGame(sel));
    // Fetch full game details; slice will update on fulfillment
    if (sel.id !== 0) {
      fetchGameById(sel.id);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 pb-4 pt-4 bg-gray items-center">
      <Autocomplete
        items={results}
        onInputChange={handleSearch}
        onSelectionChange={(val) => {
          const selected = gamesList.find((g) => String(g.id) === String(val));
          if (selected) getGame(selected);
          // if (currentGame) dispatch(setGame(currentGame));
        }}
        aria-label="Поиск игры"
        placeholder="Найти свою игру"
        isClearable
        className="max-w-md"
        type="text"
        allowsEmptyCollection={true}
        selectorIcon={""}
        isLoading={isFetching}
        menuTrigger="input"
        onClear={() => {
          dispatch(setLastSearchQuery(""));
        }}
        listboxProps={{
          emptyContent: q ? "Нечего показывать" : "Подождите...",
        }}
      >
        {(game) => (
          <AutocompleteItem key={game.id} textValue={game.name}>
            <div className="flex gap-2 items-center">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-small">{game.name}</span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>

      {/* classNames={{
          base: "max-w-md",
          trigger: "min-h-12 py-2",
        }} */}
    </div>
  );
};

export default NavBar;
