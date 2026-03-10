"use client";

import React, { useState } from "react";

import RatedGame from "./RatedGame";

import { RatedGameDBType } from "@/app/shared/types";
import ScaleDropdown from "./ScaleDropdown";

interface RatedGamesProps {
  ratingList: RatedGameDBType[];
  onRemoveRating: (gameId: string) => void | Promise<void>;
}

const RatedGamesList: React.FC<RatedGamesProps> = ({
  ratingList,
  onRemoveRating,
}) => {
  const [scaleMode, setScaleMode] = useState<"medium" | "small" | "big">(
    "medium",
  );

  return (
    <section className="w-full h-full flex flex-col items-end">
      <ScaleDropdown mode={scaleMode} setter={setScaleMode} />
      <div
        className={`pt-6 w-full grid grid-cols-${scaleMode === "big" ? "1" : scaleMode === "small" ? "4" : "2"} gap-8`}
      >
        {ratingList?.map((game) => (
          <RatedGame
            mode={scaleMode}
            key={game.id}
            game={game}
            onRemoveRating={onRemoveRating}
          />
        ))}
      </div>
    </section>
  );
};

export default RatedGamesList;
