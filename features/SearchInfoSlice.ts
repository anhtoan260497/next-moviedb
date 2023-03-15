import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieInfo } from "./MovieInfoSlice";
import getSearch from "@/api/getSearch";

export interface SearchInfoSlice {
  searchResult: MovieInfo[];
  filter: string;
  totalPages: number;
  currentPage: number;
}

const initialState: SearchInfoSlice = {
  searchResult: [],
  filter: "movie",
  totalPages: 1,
  currentPage: 1,
};

export interface ParamsGetSearchMovies {
  page: number;
  search ?: string | string[];
}


export const searchInfoSlice = createSlice({
  name: "SearchInfo",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = parseInt(action.payload);
    },
  },
});

export const { setSearchResult, setFilter, setTotalPages, setCurrentPage } =
  searchInfoSlice.actions;
export default searchInfoSlice.reducer;
