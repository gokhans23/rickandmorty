// src/store/slices/charactersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
}

export interface CharactersState {
  characters: Character[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<{ results: Character[]; info: { pages: number } }>) {
      state.characters = action.payload.results;
      state.totalPages = action.payload.info.pages;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setCurrentPage, setLoading, setError } = charactersSlice.actions;

export default charactersSlice.reducer;
