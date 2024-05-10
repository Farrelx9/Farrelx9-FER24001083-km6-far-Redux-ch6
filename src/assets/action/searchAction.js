import axios from "axios";
import { setMovies } from "../reducers/searchReducer";



export const searchMovies = (query) => async (dispatch) => {
  const API_KEY = process?.env.API_KEY;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1&year=2021&region=EN`
    );
    console.log("response", response.data.results);
    dispatch(setMovies(response.data.results));
  } catch (error) {
    console.error("Error Fetching Data: ", error);
  }
};
