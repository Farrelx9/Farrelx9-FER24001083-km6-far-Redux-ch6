import axios from "axios";
import { setUser, setError, clearError } from "../reducers/googleLoginReducer";

export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
      {
        access_token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token } = response.data.data;
    localStorage.setItem("token", token);
    dispatch(setUser(response.data));
    console.log("clearError", clearError());
    navigate("/", { state: { token: token } });
    alert("Login successful, enjoy watching!");
  } catch (error) {
    console.log(error);
    dispatch(setError("Failed to login with Google! Please try again."));
    alert("Failed to login with Google! Please try again.");
  }
};
