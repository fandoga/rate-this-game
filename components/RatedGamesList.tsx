"use client";

import React from "react";

import RatedGame from "./RatedGame";

import { RatedGameDBType } from "@/app/shared/types";

interface RatedGamesProps {
  ratingList: RatedGameDBType[];
  onRemoveRating: (gameId: string) => void | Promise<void>;
}

const RatedGamesList: React.FC<RatedGamesProps> = ({
  ratingList,
  onRemoveRating,
}) => {
  return (
    <section className="w-full grid grid-cols-2 gap-8">
      {ratingList?.map((game) => (
        <RatedGame key={game.id} game={game} onRemoveRating={onRemoveRating} />
      ))}
    </section>
  );
};

export default RatedGamesList;
