"use client";

import { RatedGame, RawgGame } from "@/types";
import { loadRatedGame } from "@/utils/localStorage";
import React, { useEffect, useState } from "react";

interface RatedGamesProps {
  ratingList: RatedGame[];
}

const RatedGamesList: React.FC<RatedGamesProps> = ({ ratingList }) => {
  return (
    <section className="w-full">
      {ratingList?.map((game) => (
        <div
          className="bg-gray p-5 rounded-lg w-full flex items-center justify-between mb-8"
          key={game.id}
        >
          <div className="game flex items-center flex-col">
            <img
              className="w-sm h-sm rounded-lg"
              src={game.bg_img}
              alt={game.name}
            />
            <h2 className="text-4xl font-bold pt-5">{game.name}</h2>
          </div>
          <div className="rating flex items-center gap-6">
            <div className="flex gap-4 text-4xl font-bold text-purple-600">
              <span>{game.rating.story}</span>
              <span>{game.rating.visual}</span>
              <span>{game.rating.gameplay}</span>
              <span>{game.rating.tech}</span>
            </div>
            <div className="flex items-center justify-center bg-blue-900 rounded-full w-22 h-22">
              <h2 className="text-5xl font-bold">{game.rating.summary}</h2>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RatedGamesList;
