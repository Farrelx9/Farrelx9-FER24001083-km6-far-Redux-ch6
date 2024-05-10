import axios from "axios";
import { setTopRated } from "../reducers/topRatedReducer";


export const getTopRated = () => async (dispatch, getState) => {
  const API_KEY = process?.env.API_KEY;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    console.log("response", response.data.results);
    dispatch(setTopRated(response.data.results));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
