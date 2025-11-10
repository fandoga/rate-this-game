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

import { useLazySearchGamesQuery } from "@/store/services/rawgApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import debounce from "debounce";

const NavBar = () => {
  const { setGame, setLastSearchQuery } = rateSlice.actions;
  const dispatch = useAppDispatch();
  const [trigger, { data, isFetching }] = useLazySearchGamesQuery();
  const q = useAppSelector((s) => s.rateSlice.lastSearchQuery);

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

  return (
    <div className="flex flex-col w-full gap-2 pb-4 pt-4 bg-gray items-center">
      <Autocomplete
        items={results}
        onInputChange={handleSearch}
        onSelectionChange={(val) => {
          const selected = gamesList.find((g) => String(g.id) === String(val));
          if (selected) dispatch(setGame(selected));
        }}
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
      {/* <Input
        onChange={handleSearch}
        placeholder="Search for games..."
        isClearable
        className="max-w-md"
        type="text"
      />
      <Select
        classNames={{
          base: "max-w-md",
          trigger: "min-h-12 py-2",
        }}
        isMultiline={true}
        placeholder="Select a game"
        items={gamesList}
        variant="bordered"
      >
        {(game) => (
          <SelectItem key={game.id} textValue={game.name}>
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
          </SelectItem>
        )}
      </Select> */}
    </div>
  );
};

export default NavBar;
