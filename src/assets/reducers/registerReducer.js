import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  error: null,
  usernameError: false,
  emailError: false,
  passwordError: false,
  registrationSuccess: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      state.usernameError = false;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      state.emailError = false;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      state.passwordError = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUsernameError: (state) => {
      state.usernameError = true;
    },
    setEmailError: (state) => {
      state.emailError = true;
    },
    setPasswordError: (state) => {
      state.passwordError = true;
    },
    setRegistrationSuccess: (state) => {
      state.registrationSuccess = true;
    },
    resetRegistrationState: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.error = null;
      state.usernameError = false;
      state.emailError = false;
      state.passwordError = false;
      state.registrationSuccess = false;
    },
  },
});

// Export action creators
export const {
  setUsername,
  setEmail,
  setPassword,
  setError,
  setUsernameError,
  setEmailError,
  setPasswordError,
  setRegistrationSuccess,
  resetRegistrationState,
} = registerSlice.actions;

// Export reducer
export default registerSlice.reducer;
