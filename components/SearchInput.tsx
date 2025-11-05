"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@heroui/react";
import { useLazySearchGamesQuery } from "@/store/services/rawgApi";
import { useAppDispatch, useAppSelector } from "@/utils/hooksRedux";
import { rateSlice } from "@/store/reducers/rateSlice";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const lastQuery = useAppSelector((s) => s.rateSlice.lastSearchQuery);
  const { setLastSearchQuery } = rateSlice.actions;

  const [trigger, { isFetching }] = useLazySearchGamesQuery();
  const [value, setValue] = useState<string>(lastQuery);

  useEffect(() => {
    const id = setTimeout(() => {
      const q = value.trim();
      dispatch(setLastSearchQuery(q));
      if (q.length > 0) {
        trigger({ query: q, page: 1, page_size: 20 });
      }
    }, 300);
    return () => clearTimeout(id);
  }, [value]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Search games..."
      isClearable
      onClear={() => setValue("")}
      endContent={isFetching ? <span className="text-sm">Loading…</span> : null}
    />
  );
};

export default SearchInput;


