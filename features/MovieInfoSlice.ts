import getMovieInfo from "@/api/getMovieInfo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MovieInfo {
  adult?: boolean;
  episode_run_time?: number[];
  backdrop_path?: string;
  belongs_to_collection?: BelongsToCollection;
  budget?: number;
  first_air_date?: string;
  genres?: Genres[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  languages?: string[];
  original_language?: string;
  original_title?: string;
  original_name?: string;
  origin_country?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_company?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languague?: SpokenLanguague[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
}

interface Genres {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguague {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CrewItem {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CastItem {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface MovieInfoSliceData {
  info: MovieInfo;
  trailer: VideoItem;
  isErrorMovieInfo: boolean;
  isLoading: boolean;
  crew: CrewItem[];
  cast: CastItem[];
}

export interface VideoItem {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

const initialState: MovieInfoSliceData = {
  info: {},
  trailer: {
    id: "",
    iso_639_1: "",
    iso_3166_1: "",
    key: "",
    name: "",
    official: false,
    published_at: "",
    site: "",
    size: 0,
    type: "",
  },
  crew: [
    {
      adult: false,
      credit_id: "",
      department: "",
      gender: 1,
      id: 0,
      job: "",
      known_for_department: "",
      name: "",
      original_name: "",
      popularity: 0,
      profile_path: "",
    },
  ],
  cast: [
    {
      adult: false,
      cast_id: 0,
      character: "",
      credit_id: "",
      gender: 0,
      id: 0,
      known_for_department: "",
      name: "",
      order: 0,
      original_name: "",
      popularity: 0,
      profile_path: "",
    },
  ],
  isErrorMovieInfo: false,
  isLoading: false,
};

export const getTrailersMovie = createAsyncThunk(
  "MovieInfo/getTrailersMovie",
  async ({
    type,
    id,
  }: {
    type?: string | string[];
    id?: string | string[];
  }) => {
    try {
      const result = await getMovieInfo.getVideoFilm(type, id);
      const videoTrailer = result.data.results.filter((item: VideoItem) =>
        item.name?.includes("Trailer")
      );
      return videoTrailer.length > 0 ? videoTrailer[0] : "";
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCreditMovie = createAsyncThunk(
  "MovieInfo/getCreditMovie",
  async ({
    type,
    id,
  }: {
    type?: string | string[];
    id?: string | string[];
  }) => {
    try {
      const result = await getMovieInfo.getCreditFilm(type, id);
       return result.data
    } catch (err) {
      console.log(err);
    }
  }
);

export const movieInfoSlice = createSlice({
  name: "movieInfoSlice",
  initialState,
  reducers: {
    setMovieInfo: (state, action) => {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTrailersMovie.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTrailersMovie.rejected, (state, action) => {
      state.isErrorMovieInfo = true;
      state.isLoading = false;
    });
    builder.addCase(getTrailersMovie.fulfilled, (state, action) => {
      state.trailer = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCreditMovie.fulfilled, (state, action) => {
      state.crew = action.payload.crew
      state.cast = action.payload.cast
      state.isLoading = false;
    });
  },
});

export const { setMovieInfo } = movieInfoSlice.actions;
export default movieInfoSlice.reducer;
