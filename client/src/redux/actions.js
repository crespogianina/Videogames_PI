import {
  GET_VIDEOGAMES,
  GET_GAME,
  CLEAN_DETAIL,
  GET_VIDEOGAME_NAME,
  GET_GENRES,
  ORDER_GENRES,
  FILTER_GAMES,
  ORDER_GAMES,
  ORDER_RATING,
  CLEAN_FILTERS,
  ERROR,
  GET_PLATAFORMS,
} from "./action_types";
import axios from "axios";

export const getVideogames = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get("http://localhost:3001/videogames"))
        .data;

      return dispatch({ type: GET_VIDEOGAMES, payload: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGameDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`http://localhost:3001/videogames/${id}`)
      ).data;
      return dispatch({ type: GET_GAME, payload: response });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const getVideogameByName = (name) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get(`http://localhost:3001/videogames?name=${name}`)
      ).data;

      return dispatch({ type: GET_VIDEOGAME_NAME, payload: response });
    } catch (error) {
      console.log(error.response.data);
      return dispatch({ type: ERROR, payload: error.response.data });
    }
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = (await axios.get("http://localhost:3001/genres")).data;
      return dispatch({ type: GET_GENRES, payload: response });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const orderGenres = (genre) => {
  return { type: ORDER_GENRES, payload: genre };
};
export const filterGames = (option) => {
  return { type: FILTER_GAMES, payload: option };
};

export const orderGames = (order) => {
  return { type: ORDER_GAMES, payload: order };
};

export const orderRating = (order) => {
  return { type: ORDER_RATING, payload: order };
};

export const cleanFilters = () => {
  return { type: CLEAN_FILTERS };
};
export const getPlataforms = () => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.get("http://localhost:3001/videogames/platforms")
      ).data;
      console.log(response);
      return dispatch({ type: GET_PLATAFORMS, payload: response });
    } catch (error) {}
  };
};
