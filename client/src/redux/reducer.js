import {
  GET_VIDEOGAMES,
  GET_GAME,
  CLEAN_DETAIL,
  ERROR,
  GET_VIDEOGAME_NAME,
  GET_GENRES,
  ORDER_GENRES,
  FILTER_GAMES,
  ORDER_GAMES,
  ORDER_RATING,
  CLEAN_FILTERS,
  GET_PLATAFORMS,
} from "./action_types";

let initialState = {
  allVideogames: [],
  copyGames: [],
  nameGame: [],
  game: {},
  genres: [],
  gamesOrdenados: [],
  ordenados: false,
  gamesFiltered: [],
  filtrados: false,
  message: "",
  name: false,
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        copyGames: [...action.payload],
        ordenados: false,
        filtrados: false,
        message: "",
        name: false,
      };

    case GET_GAME:
      return {
        ...state,
        game: action.payload,
        message: "",
      };

    case CLEAN_DETAIL:
      return { ...state, game: {}, message: "" };

    case GET_VIDEOGAME_NAME:
      return { ...state, nameGame: action.payload, message: "", name: true };

    case GET_GENRES:
      return { ...state, genres: action.payload, message: "", name: false };

    case ORDER_GENRES:
      console.log(action.payload);
      if (action.payload === "ALL") {
        return {
          ...state,
          copyGames: [...state.allVideogames],
          gamesOrdenados: [...state.allVideogames],
          ordenados: true,
          filtrados: false,
          message: "",
          name: false,
        };
      }
      const filtrados = [...state.allVideogames].filter((game) =>
        game.genre.includes(action.payload)
      );
      return {
        ...state,
        copyGames: filtrados,
        gamesOrdenados: [...state.allVideogames],
        ordenados: true,
        filtrados: false,
        message: "",
        name: false,
      };

    case FILTER_GAMES:
      if (action.payload === "ALL") {
        return {
          ...state,
          copyGames: [...state.allVideogames],
          ordenados: true,
          gamesOrdenados: [],
          filtrados: false,
          message: "",
          name: false,
        };
      } else {
        let aux = true;
        if (action.payload === "API") aux = false;
        const filtered = [...state.allVideogames].filter(
          (game) => game.created === aux
        );
        return {
          ...state,
          copyGames: filtered,
          ordenados: true,
          gamesOrdenados: [],
          filtrados: false,
          message: "",
          name: false,
        };
      }

    case ORDER_GAMES:
      let ordenados = [];
      if (action.payload === "Ascendente") {
        ordenados = [...state.copyGames].sort((prev, next) => {
          if (prev.name < next.name) return -1;
          if (prev.name > next.name) return 1;
          return 0;
        });
        return {
          ...state,
          gamesOrdenados: ordenados,
          filtrados: true,
          message: "",
          name: false,
        };
      }
      if (action.payload === "Descendente") {
        ordenados = [...state.copyGames].sort((prev, next) => {
          if (prev.name > next.name) return -1;
          if (prev.name < next.name) return 1;
          return 0;
        });
        return {
          ...state,
          gamesOrdenados: ordenados,
          filtrados: true,
          message: "",
          name: false,
        };
      }
      return { ...state };

    case ORDER_RATING:
      let orden = [];

      if (action.payload === "Ascendente") {
        orden = [...state.copyGames].sort((prev, next) => {
          if (prev.rating < next.rating) return -1;
          if (prev.rating > next.rating) return 1;
          return 0;
        });
        return {
          ...state,
          gamesOrdenados: orden,
          filtrados: true,
          message: "",
          name: false,
        };
      }
      if (action.payload === "Descendente") {
        orden = [...state.copyGames].sort((prev, next) => {
          if (prev.rating > next.rating) return -1;
          if (prev.rating < next.rating) return 1;
          return 0;
        });
        return {
          ...state,
          gamesOrdenados: orden,
          filtrados: true,
          message: "",
          name: false,
        };
      }
      return { ...state };

    case CLEAN_FILTERS:
      return {
        ...state,
        filtrados: false,
        ordenados: false,
        copyGames: [...state.allVideogames],
        gamesOrdenados: [],
        message: "",
        name: false,
      };

    case ERROR:
      return { ...state, message: action.payload, nameGame: [], name: true };
    case GET_PLATAFORMS:
      return { ...state, platforms: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
