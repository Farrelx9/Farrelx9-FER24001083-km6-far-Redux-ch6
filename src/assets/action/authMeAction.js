import axios from "axios";
import { clearUserData, setUserData } from "../reducers/authMeReducer";

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await axios.get(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setUserData(response.data.data));
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };
};

export const logoutUser = (navigate) => {
  return async (dispatch) => {
    try {
      setTimeout(() => {
        navigate("/");
      }, 2000);
      localStorage.removeItem("token");
      dispatch(clearUserData());
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
};
