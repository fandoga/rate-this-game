"use client";

import { useAppSelector } from "@/utils/hooksRedux";
import { useSearchGamesQuery } from "@/store/services/rawgApi";

const GamesList = () => {
  const query = useAppSelector((s) => s.rateSlice.lastSearchQuery);
  const { data, isFetching, isError } = useSearchGamesQuery(
    { query, page: 1, page_size: 20 },
    { skip: !query }
  );

  if (!query) return null;
  if (isFetching) return <div>Loading…</div>;
  if (isError) return <div>Failed to load</div>;

  return (
    <ul className="space-y-2">
      {data?.results?.map((g) => (
        <li key={g.id} className="flex items-center gap-3">
          {g.background_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={g.background_image} alt={g.name} className="w-12 h-12 object-cover rounded" />
          )}
          <div>
            <div className="font-medium">{g.name}</div>
            {g.released && <div className="text-sm text-default-500">{g.released}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;


