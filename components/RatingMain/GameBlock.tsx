"use client";

import { Skeleton } from "@heroui/skeleton";

import { useAppSelector } from "@/app/shared/utils/hooksRedux";
import { Card } from "@heroui/react";
import { useState } from "react";

const GameBlock = () => {
  const { game } = useAppSelector((state) => state.rateSlice);
  const [loading, setLoading] = useState(false);

  const slugs =
    game.platforms?.map((p: any) => p?.platform?.slug).filter(Boolean) ?? [];
  const hasPc = slugs.includes("pc");
  const hasPlayStation = slugs.some((e: any) => e.includes("playstation"));
  const hasXbox = slugs.some((e: any) => e.includes("xbox"));

  if (loading) {
    return (
      <Card>
        <Skeleton>
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
  }

  if (game.name.length > 0)
    return (
      <Card className="flex flex-col rounded-lg sm:max-lg:w-full w-full lg:max-w-lg bg-gray p-7 rounded-lg self-stretch">
        <img
          alt={game.name}
          className="rounded-lg max-h-70 lg:max-h-full object-cover"
          src={game.background_image}
        />
        <h1 className="pt-3 pb-2 text-[44px] font-bold">{game.name}</h1>
        <p>{game.description_raw?.slice(0, 160) + "..."}</p>
        <div className="pt-6 flex gap-5">
          {hasPc && <img alt="PC" className="w-6 h-6" src="pc.svg" />}
          {hasPlayStation && (
            <img alt="PlayStation" className="w-6 h-6" src="ps5.svg" />
          )}
          {hasXbox && <img alt="Xbox" className="w-6 h-6" src="xbox.svg" />}
        </div>
      </Card>
    );
};

export default GameBlock;
