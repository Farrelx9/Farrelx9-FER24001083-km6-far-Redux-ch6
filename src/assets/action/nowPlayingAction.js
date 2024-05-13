import axios from "axios";
import { setNowPlaying } from "../reducers/nowPlayingReducer";



export const getNowPlaying = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  try {
    if (!API_KEY) {
      throw new Error("API_KEY is not defined.");
    }

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    console.log("response", response.data.results);
    if (response.data && response.data.results) {
      dispatch(setNowPlaying(response.data.results));
    } else {
      throw new Error("Invalid response data structure.");
    }
  } catch (error) {
    console.error("Error fetching now playing movies:", error);

    alert("Failed to fetch now playing movies. Please try again later.");
  }
};
