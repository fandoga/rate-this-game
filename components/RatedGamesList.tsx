"use client";

import { RatedGameType, RawgGame } from "@/types";
import React, { useEffect, useState } from "react";
import RatedGame from "./RatedGame";
import RatedGameModal from "./RatedGameModal";
import { useDisclosure } from "@heroui/modal";

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
