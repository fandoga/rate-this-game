"use client";

import { useEffect, useState } from "react";

import { useGameRatings } from "../shared/hooks/useGameRatings";

import RatedGamesList from "@/components/RatedGamesList";
import { RatedGameType } from "@/app/shared/types";

export default function Profile() {
  const { ratings, loading, removeRating, isAuthenticated } = useGameRatings();
  const [ratingList, setRatingList] = useState<RatedGameType[]>([]);

  useEffect(() => {
    setRatingList(ratings);
  }, [ratings]);

  console.log(ratings);

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
            className="text-indigo-500 font-semibold underline-offset-6 hover:underline hover:text-shadow-lg text-shadow-indigo-500/30"
            href="/"
          >
            Начать оценивать
          </a>
        </div>
      )}
    </div>
  );
}
