"use client";

import RatedGamesList from "@/components/RatedGamesList";
import { RatedGame } from "@/types";
import { loadRatedGame } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export default function Profile() {
  const [ratingList, setRatingList] = useState<RatedGame[]>([]);
  useEffect(() => {
    setRatingList(loadRatedGame());
  }, []);

  return (
    <div className="flex items-start gap-10 justify-center">
      {ratingList.length > 0 ? (
        <RatedGamesList ratingList={ratingList} />
      ) : (
        <div className="text-center text-6xl">
          <h1 className="text-4xl font-bold pb-12">
            У вас пока нет рецензий:(
          </h1>
          <a
            className="text-indigo-500 font-semibold hover:text-shadow-lg text-shadow-indigo-500/40"
            href="/"
          >
            Начать оценивать
          </a>
        </div>
      )}
    </div>
  );
}
