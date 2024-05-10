import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: null,
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setMovieDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { setMovieDetail } = detailSlice.actions;

export default detailSlice.reducer;
