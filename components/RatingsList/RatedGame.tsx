"use client";

import { useDisclosure } from "@heroui/modal";
import React from "react";
import clsx from "clsx";

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
  mode: "medium" | "small" | "big";
};

const RatedGame: React.FC<RatedGameProps> = ({
  game,
  onRemoveRating,
  mode,
}) => {
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
        className={clsx(
          "relative cursor-pointer rounded-lg bg-linear-to-r from-gray p-5 w-full h-full flex items-center justify-between",
          isGOAT ? "to-yellow-700/12" : "to-blue-800/12",
          // On small screens stack content to avoid horizontal overflow
          mode === "small"
            ? "flex-col 2xl:aspect-[5/6] lg:aspect-[1]"
            : "flex-col sm:flex-row",
        )}
        type="button"
        onClick={onOpen}
      >
        <div className="game flex items-center flex-col">
          <img
            alt={game.gameName}
            className={clsx(
              "rounded-lg object-cover w-full",
              mode === "small"
                ? "xl:h-50 aspect-[5/3] lg:h-70 md:h-45"
                : "max-w-[400px]",
            )}
            src={game.gameImage}
          />
          <h2 className="text-3xl font-bold pt-5">{game.gameName}</h2>
        </div>
        <RatingSpan game={game} />
        <Dropdown>
          <DropdownTrigger
            className={clsx(
              "cursor-pointer w-6 h-6 absolute opacity-30 transition-all hover:scale-105 hover:opacity-100",
              mode === "small" ? "bottom-2 right-2" : "top-5 right-5",
            )}
          >
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
