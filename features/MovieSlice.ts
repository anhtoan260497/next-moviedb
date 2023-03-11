import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getListMovie from "@/api/getListMovie";
import { MovieList } from "@/pages";
import { Reducers } from "@/store/store";
import axios from "axios";

export interface Movies {
  movies: MovieList[];
}

export interface TrailerItems {
      poster_path: string,
      name: string,
      video_name: string,
      id: string,
      path : string
}

export interface TrailersHomePage {
  tv : TrailerItems[],
  movies : TrailerItems[]
}

interface MovieSliceState {
  isLoading: boolean;
  isLoadingPopular: boolean;
  isLoadingTrailer : boolean,
  isError: boolean;
  isErrorPopular: boolean;
  isModalTrailers: boolean;
  isErrorTrailer : boolean,
  trending: Movies[];
  popular: Movies[];
  trailers : TrailersHomePage ,
  hoverTrailerItem : TrailerItems,
  choosingTrailer : TrailerItems
}

const initialState: MovieSliceState = {
  isLoading: false,
  isLoadingPopular: false,
  isLoadingTrailer : false,
  isError: false,
  isErrorPopular: false,
  isModalTrailers: false,
  isErrorTrailer : false,
  trending: [],
  popular: [],
  trailers : {
    tv :[{
      poster_path: '',
      name: '',
      video_name: '',
      id: '',
      path : ''
    }],
    movies : [{
      poster_path: '',
      name: '',
      video_name: '',
      id: '',
      path : ''
    }]
  },
  hoverTrailerItem : {
    poster_path: '',
    name: '',
    video_name: '',
    id: '',
    path : ''
  },
  choosingTrailer : {
    poster_path: '',
    name: '',
    video_name: '',
    id: '',
    path : ''
  }
};

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
  "Movie/Popular",
  async (params: string) => {
    try {
      const result = await getListMovie.getPopular(params);
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getTrailers = createAsyncThunk("Movie/Trailers", async (type) => {
  try {
    const result = await axios.get(
      "https://api.cpsi.services/5bc735214e4a0c781fa0"
    );
      return result.data
  } catch (err) {
    console.log(err);
  }
});

export const movieSlice = createSlice({
  name: "MovieSlice",
  initialState,
  reducers: {
    setModalTrailers(state, action) {
      state.isModalTrailers = action.payload;
    },
    setHoverTrailerItem(state,action){
      state.hoverTrailerItem = action.payload
    },
    setChoosingTrailer(state,action) {
      state.choosingTrailer = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTrending.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getTrending.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      }),
      builder.addCase(getTrending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trending = action.payload.filter((item:MovieList) => item.vote_average !== 0);
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
        state.popular = action.payload.filter((item:MovieList)=>item.vote_average !== 0);
      });
      builder.addCase(getTrailers.pending,(state) => {
        state.isLoadingTrailer = true
      }),
      builder.addCase(getTrailers.rejected,(state) => {
        state.isLoadingTrailer = false
        state.isErrorTrailer =  true
      }),
      builder.addCase(getTrailers.fulfilled,(state,action) => {
        state.isLoadingTrailer = false
        state.trailers = action.payload
      })
  },
});

export const { setModalTrailers, setHoverTrailerItem, setChoosingTrailer } = movieSlice.actions;
export default movieSlice.reducer;
