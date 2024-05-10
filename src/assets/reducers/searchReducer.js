import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  isEmpty: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      state.isEmpty = action.payload.length === 0;
    },
  },
});

export const { setMovies } = searchSlice.actions;

export default searchSlice.reducer;
