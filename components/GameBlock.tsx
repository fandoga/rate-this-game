"use client";

import { useLazyGetGameByIdQuery } from "@/store/services/rawgApi";
import { RawgGame } from "@/types";
import { useAppSelector } from "@/utils/hooksRedux";
import { Skeleton } from "@heroui/skeleton";

const GameBlock = () => {
  const { game } = useAppSelector((state) => state.rateSlice);
  const [, { isLoading }] = useLazyGetGameByIdQuery();

  console.log(game);

  const slugs =
    game.platforms?.map((p: any) => p?.platform?.slug).filter(Boolean) ?? [];
  const hasPc = slugs.includes("pc");
  const hasPlayStation = slugs.some((e: any) => e.includes("playstation"));
  const hasXbox = slugs.some((e: any) => e.includes("xbox"));

  if (game.name.length > 0)
    return (
      <Skeleton isLoaded={!isLoading} className="rounded-lg">
        <div className="flex flex-col max-w-lg bg-gray p-7 rounded-lg self-stretch">
          <img
            className="rounded-lg"
            src={game.background_image}
            alt={game.name}
          />
          <h1 className="pt-3 pb-2 text-[44px] font-bold">{game.name}</h1>
          <p>{game.description_raw?.slice(0, 160) + "..."}</p>
          <div className="pt-6 flex gap-5">
            {hasPc && <img className="w-6 h-6" src="pc.svg" />}
            {hasPlayStation && <img className="w-6 h-6" src="ps5.svg" />}
            {hasXbox && <img className="w-6 h-6" src="xbox.svg" />}
          </div>
        </div>
      </Skeleton>
    );
};

export default GameBlock;
