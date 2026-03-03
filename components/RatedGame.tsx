import { useDisclosure } from "@heroui/modal";
import React from "react";

import RatedGameModal from "./RatedGameModal";
import RatingSpan from "./RatingSpan";

import { GameType, RatedGameDBType, RatedGameType, } from "@/app/shared/types";

type RatedGameProps = {
  game: RatedGameDBType;
};

const RatedGame: React.FC<RatedGameProps> = ({ game }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isGOAT = game.summary === 100;

  return (
    <>
      <RatedGameModal
        isOpen={isOpen}
        sel_game={game}
        onOpenChange={onOpenChange}
      />
      <button
        aria-label={`Open rated game: ${game.gameName}`}
        className={`bg-linear-to-r from-gray ${isGOAT ? "to-yellow-700/12" : "to-blue-800/12"} p-5 rounded-lg w-full h-90 flex items-center justify-between cursor-pointer`}
        type="button"
        onClick={onOpen}
      >
        <div className="game flex items-center flex-col">
          <img
            alt={game.gameName}
            className="w-sm h-sm rounded-lg h-64 object-cover"
            src={game.gameImage}
          />
          <h2 className="text-4xl font-bold pt-5">{game.gameName}</h2>
        </div>
        <RatingSpan game={game} />
      </button>
    </>
  );
};

export default RatedGame;
