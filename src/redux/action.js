import {
  GET_GENRES,
  GET_MOVIE_RESULTS,
  ERROR,
  PENDING,
  RESET_MOVIE_RESULT,
} from "./type";
import axios from "axios";

const apiKey = "9f64e222db1682c160045722299d0bc0";
const baseURL = "https://api.themoviedb.org/3";

export const getGenres = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PENDING, payload: true });
      const { data } = await axios.get(`${baseURL}/genre/movie/list`, {
        params: {
          api_key: apiKey,
        },
      });
      dispatch({ type: GET_GENRES, payload: data });
      dispatch({ type: PENDING, payload: false });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error?.message || "Something went wrong",
      });
      dispatch({ type: PENDING, payload: false });
    }
  };
};

export const getMovies = (searchQuery, selectedGenres, pagNum) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PENDING, payload: true });
      const { data } = await axios.get(`${baseURL}/search/movie`, {
        params: {
          api_key: apiKey,
          query: searchQuery,
          with_genres: selectedGenres.join(","),
          page: pagNum
        },
      });
      dispatch({
        type: GET_MOVIE_RESULTS,
        payload: data,
      });
      dispatch({ type: PENDING, payload: false });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error?.message || "Something went wrong",
      });
      dispatch({ type: PENDING, payload: false });
    }
  };
};

export const resetMovieResults = () => (dispatch) => {
  dispatch({ type: RESET_MOVIE_RESULT });
};
