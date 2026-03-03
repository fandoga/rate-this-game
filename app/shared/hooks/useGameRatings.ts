"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export interface GameRating {
  id: string;
  gameId: string;
  gameName: string;
  gameImage?: string;
  rating: Game;
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Game {
  story: number;
  visual: number;
  gameplay: number;
  tech: number;
  sub: number;
  summary: number;
}

// ========== Фолбэк на localStorage для незалогиненных ==========

function getLocalRatings(): GameRating[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("gameRatings");
  return data ? JSON.parse(data) : [];
}

function setLocalRatings(ratings: GameRating[]) {
  localStorage.setItem("gameRatings", JSON.stringify(ratings));
}

// ========== Хук ==========

export function useGameRatings() {
  const { data: session, status } = useSession();
  const [ratings, setRatings] = useState<GameRating[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = status === "authenticated";

  // Загрузка оценок
  const fetchRatings = useCallback(async () => {
    setLoading(true);

    if (isAuthenticated) {
      // Загружаем из БД через API
      const res = await fetch("/api/ratings");
      const data = await res.json();
      setRatings(Array.isArray(data) ? data : []);
    } else {
      // Фолбэк на localStorage
      setRatings(getLocalRatings());
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
      rating: Game;
      review?: string;
    }) => {
      if (isAuthenticated) {
        const res = await fetch("/api/ratings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(game),
        });
        const saved = await res.json();

        setRatings((prev) => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const filtered = safePrev.filter((r) => r.gameId !== game.gameId);
          return [saved, ...filtered];
        });
      } else {
        // localStorage
        const newRating: GameRating = {
          id: crypto.randomUUID(),
          ...game,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setRatings((prev) => {
          const filtered = prev.filter((r) => r.gameId !== game.gameId);
          const updated = [newRating, ...filtered];
          setLocalRatings(updated);
          return updated;
        });
      }
    },
    [isAuthenticated],
  );

  // Удалить оценку
  const removeRating = useCallback(
    async (gameId: string) => {
      if (isAuthenticated) {
        await fetch(`/api/ratings/${gameId}`, { method: "DELETE" });
      }

      setRatings((prev) => {
        const updated = prev.filter((r) => r.gameId !== gameId);
        if (!isAuthenticated) setLocalRatings(updated);
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
  };
}
