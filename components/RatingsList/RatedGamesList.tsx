"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

import RatedGame from "./RatedGame";

import { RatedGameDBType } from "@/app/shared/types";
import ScaleDropdown from "./ScaleDropdown";
import { loadUserData } from "@/app/shared/utils/localStorage";

type ScaleMode = "small" | "big";

interface RatedGamesProps {
  ratingList: RatedGameDBType[];
}

const RatedGamesList: React.FC<RatedGamesProps> = ({ ratingList }) => {
  const [scaleMode, setScaleMode] = useState<ScaleMode>("small");

  useEffect(() => {
    const userData = loadUserData() as { scaleMode?: ScaleMode } | [];

    if (userData && !Array.isArray(userData) && userData.scaleMode) {
      setScaleMode(userData.scaleMode);
    }
  }, []);

  const gridClassName = clsx(
    "pt-6 grid w-full gap-6",
    scaleMode === "big" && "grid-cols-1",
    scaleMode === "small" &&
      "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
  );

  return (
    <section className="flex h-full w-full flex-col items-end">
      <ScaleDropdown mode={scaleMode} setter={setScaleMode} />
      <div className={gridClassName}>
        {ratingList?.map((game) => (
          <RatedGame mode={scaleMode} key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
};

export default RatedGamesList;
