"use client";

import React from "react";

import RatedGame from "./RatedGame";

import { RatedGameType } from "@/app/shared/types";

interface RatedGamesProps {
  ratingList: RatedGameType[];
}

const RatedGamesList: React.FC<RatedGamesProps> = ({ ratingList }) => {
  return (
    <section className="w-full grid grid-cols-2 gap-8">
      {ratingList?.map((game) => <RatedGame key={game.id} game={game} />)}
    </section>
  );
};

export default RatedGamesList;
