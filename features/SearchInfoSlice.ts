import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieInfo } from "./MovieInfoSlice";
import getSearch from "@/api/getSearch";

export interface SearchInfoSlice {
  searchResult: searchData;
  trendingResult : MovieInfo[]
  filter: string;
  totalPages: number;
  currentPage: number;
  isLoadingChangeFilter: boolean;
}

export interface searchData {
  [key: string]: SearchItem;
}

export interface SearchItem {
  type: string;
  data: MovieInfo[];
  totalPages: number;
  totalResults: number;
}

const initialState: SearchInfoSlice = {
  searchResult: {},
  trendingResult : [],
  filter: "movie",
  totalPages: 1,
  currentPage: 1,
  isLoadingChangeFilter: false,
};

export interface ParamsGetSearchMovies {
  page: number;
  search?: string | string[];
}

export const getTrendingTitle = createAsyncThunk(
  "SearchInfo/Trending",
  async () => {
    try {
      const result = await getSearch.getTrendingTitle()
      console.log(result)
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const searchInfoSlice = createSlice({
  name: "SearchInfo",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.isLoadingChangeFilter = true;
    },
    setIsLoading: (state,action) => {
      state.isLoadingChangeFilter = false;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = parseInt(action.payload);
    },
  },
  extraReducers : builder => {
    builder.addCase(getTrendingTitle.pending, () => {

    });
    builder.addCase(getTrendingTitle.rejected, () => {

    });
    builder.addCase(getTrendingTitle.fulfilled, (state,action) => {
      state.trendingResult = action.payload
    });
  },
});

export const { setSearchResult, setFilter, setTotalPages, setCurrentPage, setIsLoading } =
  searchInfoSlice.actions;
export default searchInfoSlice.reducer;
