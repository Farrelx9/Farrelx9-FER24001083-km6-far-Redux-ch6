import axios from "axios";
import { setMoviePopular } from "../reducers/moviePopularReducer";

const API_KEY = process?.env.API_KEY;

export const getMoviePopular = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
    console.log("response", response.data.results);
    dispatch(setMoviePopular(response.data.results));
  } catch (error) {
    console.error("Error Fetching Data: ", error);
    alert("Failed to fetch popular movies. Please try again later.");
  }
};
