import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { playingnowService } from "./playingnowApi";
import { IPlayingNowDetail } from "@src/types/playingnow";

interface PlayingNowState {
  data: {
    results: IPlayingNowDetail[];
  };
  isLoading: boolean;
}

export const playingNowDefault = {
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

const initialState: PlayingNowState = {
  data: {
    results: [playingNowDefault],
  },
  isLoading: false,
};

const actionsPlayingNow = {
  GET_PLAYING_NOW: "GET_PLAYING_NOW",
};

export const getPlayingNow = createAsyncThunk(
  actionsPlayingNow.GET_PLAYING_NOW,
  async () => {
    try {
      const data = await playingnowService.getPlayingNow();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const playingNowSlice = createSlice({
  name: "playingnow",
  initialState,
  reducers: {},

  extraReducers(buider) {
    buider.addCase(getPlayingNow.pending, (state) => {
      state.isLoading = true;
    });
    buider.addCase(getPlayingNow.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
  },
});

export default playingNowSlice.reducer;
