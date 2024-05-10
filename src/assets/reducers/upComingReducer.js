import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upComing: [],
};

const movieSlicer = createSlice({
  name: "upComing",
  initialState,
  reducers: {
    setUpComing: (state, action) => {
      state.upComing = action.payload;
    },
  },
});

export const { setUpComing } = movieSlicer.actions;

export default movieSlicer.reducer;
