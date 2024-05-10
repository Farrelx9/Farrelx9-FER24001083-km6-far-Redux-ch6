import axios from "axios";
import { setUser, setError } from "../reducers/loginReducer";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const { token } = response.data.data;

    if (token) {
      localStorage.setItem("token", token);
      dispatch(setUser(response.data));
      dispatch(setError(null));
      setTimeout(() => {
        // Navigate to home after 2 seconds
        navigate("/", { state: { user: response.data } });
      }, 2000);
    } else {
      dispatch(setError("Token Expired Broo"));
    }
  } catch (error) {
    console.error("API Request Error:", error);
    dispatch(setError("Email or password is invalid"));
  }
};
