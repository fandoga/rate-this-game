import { RatedGameType } from "@/app/shared/types";

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

export const loadUserData = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER);

    return raw ? JSON.parse(raw) : [];
  } catch {
    console.error("Error while loading scale mode");

    return [];
  }
};

type ScaleMode = "medium" | "small" | "big";
type UserData = {
  scaleMode?: ScaleMode;
  noFirstVisit?: boolean;
};

const updateUserData = (patch: Partial<UserData>) => {
  if (typeof window === "undefined") return;

  const current = loadUserData();
  const safeCurrent: UserData =
    current && !Array.isArray(current) ? (current as UserData) : {};

  localStorage.setItem(USER, JSON.stringify({ ...safeCurrent, ...patch }));
};

export const setScaleMode = (mode: ScaleMode) => {
  updateUserData({ scaleMode: mode });
};

export const setFirstVisit = () => {
  updateUserData({ noFirstVisit: true });
};
