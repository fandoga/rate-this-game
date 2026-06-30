"use client";

import { useDisclosure } from "@heroui/modal";
import React from "react";
import clsx from "clsx";

import RatedGameModal from "./RatedGameModal";
import RatingSpan from "./RatingSpan";

import { RatedGameDBType } from "@/app/shared/types";

type RatedGameProps = {
  game: RatedGameDBType;
  mode: "small" | "big";
};

const RatedGame: React.FC<RatedGameProps> = ({ game, mode }) => {
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
          "relative cursor-pointer rounded-lg bg-linear-to-r from-gray w-full h-full flex items-center justify-center",
          isGOAT ? "to-yellow-700/12" : "to-blue-800/12",
          mode === "small"
            ? "flex-col aspect-[9/3] p-2 2xl:my-2"
            : "flex-col 2xl:aspect-[5/6] p-5",
        )}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        <div
          className={clsx(
            "game flex items-center gap-3 justify-between w-full",
            mode === "small" ? "flex-row" : "flex-col",
          )}
        >
          <img
            alt={game.gameName}
            className={clsx(
              "rounded-lg object-cover bg-gray-900 aspect-[5/3]",
              mode === "small" ? "w-[45%]" : "max-w-[400px] w-full",
            )}
            src={game.gameImage}
          />
          <div className="flex flex-col items-end justify-center text-center">
            <h2
              className={clsx(
                "font-bold text-center w-full",
                mode === "small" ? "text-xl" : "text-3xl pt-5",
              )}
            >
              {game.gameName}
            </h2>
            {mode === "small" && <RatingSpan mode={mode} game={game} />}
          </div>
        </div>
        {mode === "big" && <RatingSpan mode={mode} game={game} />}
      </button>
    </>
  );
};

export default RatedGame;
