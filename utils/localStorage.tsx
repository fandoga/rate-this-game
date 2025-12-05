import { RatedGameType } from "@/types";

const KEY = "ratedGames";
const USER = "userData";

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

export const saveRatedGame = (obj: RatedGameType) => {
  if (typeof window === "undefined") return [];
  const items = loadRatedGame();
  let alreadyHas = false;
  items.map((item: RatedGameType) => {
    if (item.id === obj.id) {
      alreadyHas = true;
    }
  });
  if (!alreadyHas) {
    localStorage.setItem(KEY, JSON.stringify([...items, obj]));
  } else {
    return true;
  }
};

export const setFirstVisit = () => {
  if (typeof window === "undefined") return [];
  localStorage.setItem(USER, JSON.stringify({ noFirstVisit: true }));
};
