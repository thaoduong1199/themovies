import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITopRatedDetail } from "@src/types/toprated";
import { topratedService } from "./topratedApi";

interface TopRatedState {
  data: {
    results: ITopRatedDetail[];
  };
  isLoading: boolean;
}

export const topRatedDefault = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const initialState: TopRatedState = {
  data: {
    results: [topRatedDefault],
  },
  isLoading: false,
};

const actionsTopRated = {
  GET_TOP_RATED: "GET_TOP_RATED",
};

export const getTopRated = createAsyncThunk(
  actionsTopRated.GET_TOP_RATED,
  async () => {
    try {
      const data = await topratedService.getTopRated();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const topratedSlice = createSlice({
  name: "toprated",
  initialState,
  reducers: {},

  extraReducers(buider) {
    buider.addCase(getTopRated.pending, (state) => {
      state.isLoading = true;
    });
    buider.addCase(getTopRated.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export default topratedSlice.reducer;
