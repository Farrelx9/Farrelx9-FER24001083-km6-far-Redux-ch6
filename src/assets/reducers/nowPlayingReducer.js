import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: [],
};

const movieSlicer = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
  },
});

export const { setNowPlaying } = movieSlicer.actions;

export default movieSlicer.reducer;
