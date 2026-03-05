import { useDisclosure } from "@heroui/modal";
import React from "react";

import RatedGameModal from "./RatedGameModal";
import RatingSpan from "./RatingSpan";

import { RatedGameDBType } from "@/app/shared/types";
import { Trash } from "@/app/shared/utils/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

type RatedGameProps = {
  game: RatedGameDBType;
  onRemoveRating: (gameId: string) => void | Promise<void>;
};

const RatedGame: React.FC<RatedGameProps> = ({ game, onRemoveRating }) => {
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
        className={`relative bg-linear-to-r from-gray ${isGOAT ? "to-yellow-700/12" : "to-blue-800/12"} p-5 rounded-lg w-full h-90 flex items-center justify-between cursor-pointer`}
        type="button"
        onClick={onOpen}
      >
        <div className="game flex items-center flex-col">
          <img
            alt={game.gameName}
            className="w-sm h-sm rounded-lg h-64 object-cover"
            src={game.gameImage}
          />
          <h2 className="text-3xl font-bold pt-5">{game.gameName}</h2>
        </div>
        <RatingSpan game={game} />
        <Dropdown>
          <DropdownTrigger className="cursor-pointer w-6 h-6 absolute top-5 right-5 opacity-30 transition-all hover:scale-105 hover:opacity-100">
            <Trash />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">Отмена</DropdownItem>
            <DropdownItem
              onClick={() => onRemoveRating(game.gameId)}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Удалить
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </button>
    </>
  );
};

export default RatedGame;
