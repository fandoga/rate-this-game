"use client";

import { GameType } from "@/app/shared/types";
import MobileTooltip from "@/app/shared/components/MobileTooltip";
import clsx from "clsx";
import { useState } from "react";

const RatingSpan = ({
  game,
  mode,
}: {
  game: GameType;
  mode: "small" | "big";
}) => {
  const isGOAT = game.summary === 100;

  const [textClass, setTextClass] = useState(
    clsx(
      "inline-flex w-6 justify-center cursor-default transition-all hover:scale-120",
      mode === "small" ? "text-lg lg:text-[20px]" : "text-3xl",
    ),
  );

  return (
    <div className="rating flex items-center gap-6 mt-4 mr-1">
      <div
        className={clsx(
          "text-shadow-lg text-shadow-purple-600/20 flex font-semibold text-purple-500",
          mode === "small" ? "gap-1" : "gap-5",
        )}
      >
        <MobileTooltip
          className="text-purple-500"
          content="Сюжет"
          data={game.story}
          spanClass={textClass}
        />
        <MobileTooltip
          className="text-purple-500"
          content="Визуал"
          data={game.visual}
          spanClass={textClass}
        />
        <MobileTooltip
          className="text-purple-500"
          content="Геймплей"
          data={game.gameplay}
          spanClass={textClass}
        />
        <MobileTooltip
          className="text-purple-500"
          content="Тех. часть"
          data={game.tech}
          spanClass={textClass}
        />
      </div>
      <div
        className={clsx(
          `flex items-center shadow-lg justify-center ${isGOAT ? "bg-yellow-500 shadow-yellow-300" : "bg-blue-900 shadow-blue-800"} rounded-full`,
          mode === "small"
            ? "w-10 h-10 lg:w-15 lg:h-15 2xl:h-11 2xl:w-11"
            : "w-18 h-18",
        )}
      >
        <h2
          className={clsx(
            "font-bold",
            mode === "small" ? "text-lg lg:text-3xl 2xl:text-xl" : "text-4xl",
          )}
        >
          {game.summary}
        </h2>
      </div>
    </div>
  );
};

export default RatingSpan;
