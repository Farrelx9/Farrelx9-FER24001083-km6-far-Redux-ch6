import axios from "axios";
import { setMovieDetail } from "../reducers/detailReducer";


export const fetchMovieDetail = (movieId) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    console.log("response.detail ", response.data);
    dispatch(setMovieDetail(response.data));
  } catch (error) {
    console.error("Error fetching movie detail: ", error);
  }
};
