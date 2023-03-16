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
  media_type?: string;
  name ?: string;
  original_language?: string;
  original_title?: string;
  original_name?: string;
  origin_country?: string;
  overview?: string;
  parts ?: MovieInfo[]
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguague[];
  seasons?: SeasonInfoInterface[];
  status?: string;
  tagline?: string;
  title?: string;
  type ?: string,
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
  logo_path: string;
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
  character ?: string,
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

export interface CastItemInterface {
  adult?: boolean;
  cast_id?: number;
  character ?: string;
  credit_id?: string;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  order?: number;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
}

interface MovieInfoSliceData {
  info: MovieInfo;
  trailer: VideoItem;
  isErrorMovieInfo: boolean;
  isLoading: boolean;
  crew: CrewItem[];
  cast: CastItemInterface[];
  reviews: ReviewInterface[];
  recommendationFilms: MovieInfo[];
  externalIds : ExternalIds
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

export interface SeasonInfoInterface {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface ReviewInterface {
  author: string;
  author_details: reviewPerson;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface reviewPerson {
  avatar_path: string | null;
  name: string;
  rating: number;
  username: string;
}

export interface ExternalIds {
  id ?: number;
  imdb_id ?: string;
  wikidata_id ?: string;
  facebook_id ?: string;
  instagram_id ?: string;
  twitter_id ?: string;
}

const initialState: MovieInfoSliceData = {
  info: {
    original_name: "",
    first_air_date: "",
    vote_average: 0,
    seasons: [
      {
        air_date: "",
        episode_count: 0,
        id: 0,
        name: "",
        overview: "",
        poster_path: "",
        season_number: 0,
      },
    ],
  },
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
  reviews: [
    {
      author: "",
      author_details: { name: "", username: "", avatar_path: null, rating: 0 },
      content: "",
      created_at: "",
      id: "",
      updated_at: "",
      url: "",
    },
  ],
  recommendationFilms: [
    {
      original_name: "",
      first_air_date: "",
      vote_average: 0,
      seasons: [
        {
          air_date: "",
          episode_count: 0,
          id: 0,
          name: "",
          overview: "",
          poster_path: "",
          season_number: 0,
        },
      ],
    },
  ],
  externalIds : {

  }
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
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getReviewsMovie = createAsyncThunk(
  "MovieInfo/getReviewsMovie",
  async ({
    type,
    id,
  }: {
    type?: string | string[];
    id?: string | string[];
  }) => {
    try {
      const result = await getMovieInfo.getReviewFilm(type, id);
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getRecommendationFilms = createAsyncThunk(
  "MovieInfo/getRecommendationFilms",
  async ({
    type,
    id,
  }: {
    type?: string | string[];
    id?: string | string[];
  }) => {
    try {
      const result = await getMovieInfo.getRecommendationFilms(type, id);
      return result.data.results;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getExternalIds = createAsyncThunk(
  "MovieInfo/getExternalIds",
  async ({
    type,
    id,
  }: {
    type?: string | string[];
    id?: string | string[];
  }) => {
    try {
      const result = await getMovieInfo.getExternalIds(type, id);
      return result.data;
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
      state.crew = action.payload.crew;
      state.cast = action.payload.cast;
      state.isLoading = false;
    });
    builder.addCase(getReviewsMovie.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
    builder.addCase(getRecommendationFilms.fulfilled, (state, action) => {
      state.recommendationFilms = action.payload;
    });
    builder.addCase(getExternalIds.fulfilled,(state,action)=>{
      state.externalIds = action.payload
    })
  },
});

export const { setMovieInfo } = movieInfoSlice.actions;
export default movieInfoSlice.reducer;
