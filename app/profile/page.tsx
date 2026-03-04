"use client";

import { useEffect, useState } from "react";
import { useGameRatings } from "../shared/hooks/useGameRatings";
import RatedGamesList from "@/components/RatedGamesList";
import { RatedGameDBType } from "@/app/shared/types";
import { signIn } from "next-auth/react";
import { Spinner } from "@heroui/spinner";

export default function Profile() {
  const { ratings, loading, isAuthenticated } = useGameRatings();
  const [ratingList, setRatingList] = useState<RatedGameDBType[]>([]);

  useEffect(() => {
    setRatingList(ratings);
  }, [ratings]);

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  if (!isAuthenticated)
    return (
      <div className="text-center text-6xl">
        <h1 className="text-4xl font-bold pb-12">
          {"Для начала авторизуйтесь =>"}
        </h1>
        <button
          className="text-6xl font-bold text-cyan-400 cursor-pointer hover:scale-105"
          onClick={() => signIn("google")}
        >
          войти
        </button>
      </div>
    );

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
