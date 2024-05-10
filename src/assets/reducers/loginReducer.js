import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, setError, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
