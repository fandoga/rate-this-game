import { RatedGameType } from "@/types";
import { useDisclosure } from "@heroui/modal";
import React from "react";
import RatedGameModal from "./RatedGameModal";
import RatingSpan from "./RatingSpan";

type RatedGameProps = {
  game: RatedGameType;
};

const RatedGame: React.FC<RatedGameProps> = ({ game }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isGOAT = game.rating.summary === 100;

  return (
    <>
      <RatedGameModal
        sel_game={game}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div
        onClick={onOpen}
        className={`bg-linear-to-r from-gray ${isGOAT ? "to-yellow-700/12" : "to-blue-800/12"} p-5 rounded-lg w-full h-90 flex items-center justify-between cursor-pointer`}
        key={game.id}
      >
        <div className="game flex items-center flex-col">
          <img
            className="w-sm h-sm rounded-lg h-64 object-cover"
            src={game.bg_img}
            alt={game.name}
          />
          <h2 className="text-4xl font-bold pt-5">{game.name}</h2>
        </div>
        <RatingSpan game={game} />
      </div>
    </>
  );
};

export default RatedGame;
