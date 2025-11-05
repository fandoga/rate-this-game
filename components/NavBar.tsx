"use client";

import { Input } from "@heroui/react";
import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

import { useLazySearchGamesQuery } from "@/store/services/rawgApi";
import { useAppDispatch } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";
import debounce from "debounce";

const NavBar = () => {
  const { setGame } = rateSlice.actions
  const { setLastSearchQuery } = rateSlice.actions
  const dispatch = useAppDispatch()
  const [trigger, { data, isFetching }] = useLazySearchGamesQuery();
  const [value, setValue] = useState<string>('')

  // const handleSearch = (value : string) => {
  //   trigger({ query: value, page: 1 })
  //   dispatch(setLastSearchQuery(value))
  // }

const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    trigger({ query: e.target.value, page: 1 })
    dispatch(setLastSearchQuery(e.target.value))
}, 300)


  return (
    <div className="flex flex-col w-full pb-10 pt-10 bg-gray items-center">
      <Input
        onChange={handleSearch}
        size="sm"
        isClearable
        className="max-w-md"
        label="Search for games"
        type="text"
      />
    </div>
  );
};

export default NavBar;
