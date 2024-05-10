import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviePopular: [],
};

const movieSlicer = createSlice({
  name: "moviePopular",
  initialState,
  reducers: {
    setMoviePopular: (state, action) => {
      state.moviePopular = action.payload;
    },
  },
});

export const { setMoviePopular } = movieSlicer.actions;

export default movieSlicer.reducer;
