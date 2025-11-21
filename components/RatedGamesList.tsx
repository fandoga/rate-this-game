"use client";

import { RatedGameType, RawgGame } from "@/types";
import { loadRatedGame } from "@/utils/localStorage";
import React, { useEffect, useState } from "react";
import RatedGame from "./RatedGame";

interface RatedGamesProps {
  ratingList: RatedGameType[];
}

const RatedGamesList: React.FC<RatedGamesProps> = ({ ratingList }) => {
  return (
    <section className="w-full">
      {ratingList?.map((game) => <RatedGame key={game.id} game={game} />)}
    </section>
  );
};

export default RatedGamesList;
