import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topRated: [],
};

const movieSlicer = createSlice({
  name: "topRated",
  initialState,
  reducers: {
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
  },
});

export const { setTopRated } = movieSlicer.actions;

export default movieSlicer.reducer;
