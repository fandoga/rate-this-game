import { RatedGame } from "@/types";

const KEY = "ratedGames";

export const loadRatedGame = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.error("Error while loading list of rated games");
    return [];
  }
};

export const saveRatedGame = (obj: RatedGame) => {
  if (typeof window === "undefined") return [];
  const items = loadRatedGame();
  localStorage.setItem(KEY, JSON.stringify([...items, obj]));
};
