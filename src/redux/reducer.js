import {
  GET_GENRES,
  GET_MOVIE_RESULTS,
  ERROR,
  PENDING,
  RESET_MOVIE_RESULT,
} from "./type";

const initialState = {
  pending: false,
  error: null,
  get_genres: [],
  get_movie_results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_GENRES:
      return {
        ...state,
        get_genres: action.payload,
        pending: false,
      };
    case GET_MOVIE_RESULTS:
      return {
        ...state,
        get_movie_results: action.payload,
        pending: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    case RESET_MOVIE_RESULT:
      return {
        ...state,
        get_movie_results: [],
        pending: false,
      };
    default:
      return state;
  }
};

export default reducer;
