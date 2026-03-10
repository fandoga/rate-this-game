"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import { GameType, RatedGameDBType, RatedGameType } from "../types";

export function useGameRatings() {
  const { data: session, status } = useSession();
  const [ratings, setRatings] = useState<RatedGameDBType[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = status === "authenticated";

  // Загрузка оценок
  const fetchRatings = useCallback(async () => {
    if (isAuthenticated) {
      setLoading(true);
      const res = await fetch("/api/rating");
      const data = await res.json();

      setRatings(Array.isArray(data) ? data : []);
    } else {
      setRatings([]);
    }

    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (status !== "loading") {
      fetchRatings();
    }
  }, [status, fetchRatings]);

  // Добавить/обновить оценку
  const rateGame = useCallback(
    async (game: {
      gameId: string;
      gameName: string;
      gameImage?: string;
      rating: GameType;
    }) => {
      const { rating, ...rest } = game;

      if (isAuthenticated) {
        setLoading(true);

        try {
          const res = await fetch("/api/rating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...rest,
              ...rating,
            }),
          });

          const saved = await res.json();

          setRatings((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            const filtered = safePrev.filter((r) => r.gameId !== game.gameId);

            return [saved, ...filtered];
          });
        } finally {
          setLoading(false);
        }
      } else {
        if (typeof window !== "undefined") {
          window.alert("Чтобы оценивать игры, войдите в аккаунт.");
        }
      }
    },
    [isAuthenticated],
  );

  // Удалить оценку
  const removeRating = useCallback(
    async (gameId: string) => {
      if (isAuthenticated) {
        await fetch(`/api/rating/${gameId}`, { method: "DELETE" });
      }

      setRatings((prev) => {
        const updated = prev.filter((r) => r.gameId !== gameId);

        if (!isAuthenticated) {
        }

        return updated;
      });
    },
    [isAuthenticated],
  );

  // Получить оценку конкретной игры
  const getRating = useCallback(
    (gameId: string) => {
      return ratings.find((r) => r.gameId === gameId) ?? null;
    },
    [ratings],
  );

  return {
    ratings,
    loading,
    rateGame,
    removeRating,
    getRating,
    isAuthenticated,
    session,
  };
}
