import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getListMovie from "@/api/getListMovie";
import { MovieList } from "@/pages";

interface Movies {
  movies: MovieList[];
}

export const getTrending = createAsyncThunk(
  "Movie/Trending",
  async (params: string) => {
    try {
      const result = await getListMovie.getTrending("movie", params);
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getPopular = createAsyncThunk(
  "Movie/Poppular",
  async (params: string) => {
    try {
      const result = await getListMovie.getPopular(params);
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const movieSlice = createSlice({
  name: "MovieSlice",
  initialState: {
    isLoading: false,
    isLoadingPopular: false,
    isError: false,
    isErrorPopular: false,
    trending: [],
    popular: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getTrending.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      }),
      builder.addCase(getTrending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trending = action.payload;
      }),
      builder.addCase(getPopular.pending, (state) => {
        state.isLoadingPopular = true;
      }),
      builder.addCase(getPopular.rejected, (state) => {
        state.isLoadingPopular = false;
        state.isErrorPopular = true;
      }),
      builder.addCase(getPopular.fulfilled, (state, action) => {
        state.isLoadingPopular = false;
        state.popular = action.payload;
      });
  },
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
