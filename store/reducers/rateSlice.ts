import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RawgGame } from "@/types";

interface RateState {
  game: RawgGame;
  selectedGameId: number | null;
  lastSearchQuery: string;
  rating: {
    story: number;
    visual: number;
    gameplay: number;
    tech: number;
    score: number;
  };
  isLoading: boolean;
}

const initialState: RateState = {
  game: {
    id: 0,
    name: "",
    slug: "",
    released: "",
    background_image: "",
    rating: 0,
    score: 0,
    ratings_count: 0,
  },
  selectedGameId: null,
  lastSearchQuery: "",
  rating: {
    story: 4,
    visual: 4,
    gameplay: 4,
    tech: 4,
    score: 40,
  },
  isLoading: false,
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setRating(state, action: PayloadAction<any>) {
      state.rating = action.payload;
    },
    setScore(state, action: PayloadAction<number>) {
      state.rating.score = action.payload;
    },
    setGame(state, action: PayloadAction<any>) {
      state.game = action.payload;
    },
    setSelectedGameId(state, action: PayloadAction<number | null>) {
      state.selectedGameId = action.payload;
    },
    setLastSearchQuery(state, action: PayloadAction<string>) {
      state.lastSearchQuery = action.payload;
    },
  },
});

export default rateSlice.reducer;
