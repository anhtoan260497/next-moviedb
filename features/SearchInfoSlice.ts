import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieInfo } from "./MovieInfoSlice";
import getSearch from "@/api/getSearch";

export interface SearchInfoSlice {
  searchResult: searchData;
  filter: string;
  totalPages: number;
  currentPage: number;
  isLoadingChangeFilter : boolean
}

export interface searchData {
  [key:string] : SearchItem
}

export interface SearchItem {
  type : string,
  data : MovieInfo[],
  totalPages : number,
  totalResults : number
}

const initialState: SearchInfoSlice = {
  searchResult: {},
  filter: "movie",
  totalPages: 1,
  currentPage: 1,
  isLoadingChangeFilter : false,
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
      state.isLoadingChangeFilter = true
      state.isLoadingChangeFilter = false
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
