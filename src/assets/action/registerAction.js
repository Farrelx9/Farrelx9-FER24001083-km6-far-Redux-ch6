import axios from "axios";
import {
  setError,
  setRegistrationSuccess,
} from "../../assets/reducers/registerReducer";

export const registerUser = (username, email, password,) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      {
        email: email,
        name: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      dispatch(setRegistrationSuccess());
      setTimeout(() => {
        navigate("/Login", { state: { user: response.data } });
      }, 2000);
    }
  } catch (error) {
    console.error("Error object:", error);

    if (error.response) {
      console.log("Server response data:", error.response.data);

      if (error.response.data.message === "User has already registered") {
        dispatch(
          setError(
            "Registration failed: The email you entered is already registered. Please use a different email."
          )
        );
      } else {
        dispatch(
          setError(
            "Registration failed: Invalid request. Please ensure the data you entered is correct."
          )
        );
      }
    } else {
      dispatch(setError("Registration failed: Server error occurred."));
    }
  }
};
