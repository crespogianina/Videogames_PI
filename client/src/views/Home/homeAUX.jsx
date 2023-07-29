//Hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import CardsList from "../../components/CardList/CardsLists";
import SearchBar from "../../components/SearchBar/SearchBar";

//actions
import {
  getVideogames,
  getVideogameByName,
  getGenres,
  orderGenres,
  filterGames,
  orderGames,
  orderRating,
  cleanFilters,
} from "../../redux/actions";

//styles
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import { GET_VIDEOGAMES } from "../../redux/action_types";

function Home() {
  //variables
  const ITEMS_PER_PAGE = 15;

  //Hooks
  const dispatch = useDispatch();

  //estados redux
  const allVideogames = useSelector((state) => state.allVideogames);
  const copyVideogames = useSelector((state) => state.copyGames);
  const nameGame = useSelector((state) => state.nameGame);
  const genres = useSelector((state) => state.genres);
  const name = useSelector((state) => state.name);

  const gamesOrdenados = useSelector((state) => state.gamesOrdenados);
  const filtrados = useSelector((state) => state.filtered);
  //states
  const [currentPage, setCurrentPage] = useState(0);

  const [gamesFiltered, setGamesFiltered] = useState(
    [...gamesOrdenados].splice(0, ITEMS_PER_PAGE)
  );
  const [search, setSearch] = useState("");

  const [items, setItems] = useState(
    [...allVideogames]?.splice(0, ITEMS_PER_PAGE)
  );

  //funciones
  //*paginado
  const prevPage = () => {
    if (filtrados && copyVideogames.length) {
      if (gamesOrdenados.length) {
        const prev_page = currentPage - 1;
        const firstIndex = prev_page * ITEMS_PER_PAGE;
        if (prev_page < 0) return;
        setGamesFiltered(
          [...gamesOrdenados].splice(firstIndex, ITEMS_PER_PAGE)
        );
        setCurrentPage(prev_page);
        return;
      }
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setGamesFiltered([...copyVideogames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev_page);
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (prev_page < 0) return;
    setItems([...allVideogames].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prev_page);
  };

  const nextPage = () => {
    if (filtrados && copyVideogames.length) {
      if (gamesOrdenados.length) {
        const next_page = currentPage + 1;
        const firstIndex = next_page * ITEMS_PER_PAGE;
        if (firstIndex >= gamesOrdenados.length) return;
        setGamesFiltered(
          [...gamesOrdenados].splice(firstIndex, ITEMS_PER_PAGE)
        );
        setCurrentPage(next_page);
        return;
      }
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= copyVideogames.length) return;
      setGamesFiltered([...copyVideogames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next_page);
      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allVideogames.length) return;
    setItems([...allVideogames].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(next_page);
  };

  //handlers
  const handleChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  console.log(nameGame);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search !== "") {
      dispatch(getVideogameByName(search));

      setItems(nameGame);
    }
  };

  const handleClean = () => {
    dispatch(cleanFilters());
    dispatch(getVideogames());
  };

  const handleSelect = (event) => {
    const option = event.target.value;
    const name = event.target.name;

    if (name === "Géneros") dispatch(orderGenres(option));
    if (name === "Datos") {
      let aux = true;
      if (option === "API") aux = false;
      dispatch(filterGames(aux));
    }
    if (name === "Orden") dispatch(orderGames(option));
    if (name === "Rating") dispatch(orderRating(option));
  };

  //ciclo de vida

  useEffect(() => {
    if (!allVideogames.length) {
      dispatch(getVideogames());
      setItems([...allVideogames].splice(0, ITEMS_PER_PAGE));
      dispatch(getGenres());
    } else {
      if (!filtrados) {
        setItems([...allVideogames].splice(0, ITEMS_PER_PAGE));
      } else {
        if (copyVideogames.length) {
          setGamesFiltered([...copyVideogames].splice(0, ITEMS_PER_PAGE));

          if (gamesOrdenados.length) {
            setGamesFiltered([...gamesOrdenados].splice(0, ITEMS_PER_PAGE));
            if (search !== "" && name) {
              console.log(nameGame);
              setGamesFiltered([...nameGame]);
              setSearch("");
            }
          }
        }
      }
    }
  }, [
    allVideogames,
    gamesOrdenados,
    nameGame,
    filtrados,
    dispatch,
    copyVideogames,
  ]);

  useEffect(() => {}, [nameGame]);

  return (
    <div className={style.home}>
      <h1 className={style.homeTitle}>Home</h1>

      <div className={style.ordenadores}>
        <div className={style.generos}>
          <button className={style.reseat} onClick={handleClean}>
            Resetear
          </button>
          <label>Géneros</label>
          <select onChange={handleSelect} name="Géneros">
            {genres?.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className={style.generos}>
          <label>Datos </label>
          <select onChange={handleSelect} name="Datos">
            <option>ALL</option>
            <option>API</option>
            <option>DB</option>
          </select>
        </div>
        <div className={style.generos}>
          <label>Orden</label>
          <select onChange={handleSelect} name="Orden">
            <option>Ascendente</option>
            <option>Descendente</option>
          </select>
        </div>
        <div className={style.generos}>
          <label>Rating</label>
          <select onChange={handleSelect} name="Rating">
            <option>Ascendente</option>
            <option>Descendente</option>
          </select>
        </div>

        <button className={style.createGame}>
          <Link to="/create">Create videogame</Link>
        </button>
      </div>

      <SearchBar
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={search}
      />
      {allVideogames.length ? (
        filtrados && search === "" ? (
          gamesFiltered.length ? (
            <CardsList videogames={gamesFiltered} />
          ) : (
            <span className={style.notFiltered}>
              No existen videogames correspondientes
            </span>
          )
        ) : items ? (
          <CardsList videogames={items} />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            alt="Loading"
            className={style.imgLoading}
          />
        )
      ) : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
          alt="Loading"
          className={style.imgLoading}
        />
      )}

      <div className={style.paginado}>
        <button onClick={prevPage} className={style.buttonPag}>
          Prev
        </button>
        <label>{currentPage}</label>
        <button onClick={nextPage} className={style.buttonPag}>
          Next
        </button>
      </div>
    </div>
  );
}
export default Home;

///**************************************************************************************** */
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
} from "./action_types";

let initialState = {
  allVideogames: [],
  copyGames: [],
  nameGame: [],
  game: {},
  genres: [],
  name: false,
  gamesOrdenados: [],
  filtered: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        allVideogames: action.payload,
        copyGames: [...action.payload],
        filtered: false,
      };

    case GET_GAME:
      return {
        ...state,
        game: action.payload,
      };

    case CLEAN_DETAIL:
      return { ...state, game: {} };

    case GET_VIDEOGAME_NAME:
      return { ...state, nameGame: action.payload, filtered: true, name: true };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case ORDER_GENRES:
      const filtrados = [...state.allVideogames].filter((game) =>
        game.genre.includes(action.payload)
      );
      return {
        ...state,
        copyGames: filtrados,
        filtered: true,
        gamesOrdenados: [],
      };

    case FILTER_GAMES:
      if (action.payload === "ALL") {
        return {
          ...state,
          gamesOrdenados: [],
          filtered: true,
          copyGames: state.allVideogames,
        };
      }
      const filtered = [...state.allVideogames].filter(
        (game) => game.created === action.payload
      );
      return {
        ...state,
        copyGames: filtered,
        filtered: true,
        gamesOrdenados: [],
      };

    case ORDER_GAMES:
      let ordenados = [];
      if (action.payload === "Ascendente") {
        ordenados = [...state.copyGames].sort((prev, next) => {
          if (prev.name < next.name) return -1;
          if (prev.name > next.name) return 1;
          return 0;
        });
        return { ...state, gamesOrdenados: ordenados, filtered: true };
      }
      if (action.payload === "Descendente") {
        ordenados = [...state.copyGames].sort((prev, next) => {
          if (prev.name > next.name) return -1;
          if (prev.name < next.name) return 1;
          return 0;
        });
        return { ...state, gamesOrdenados: ordenados, filtered: true };
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
        return { ...state, gamesOrdenados: orden, filtered: true };
      }
      if (action.payload === "Descendente") {
        orden = [...state.copyGames].sort((prev, next) => {
          if (prev.rating > next.rating) return -1;
          if (prev.rating < next.rating) return 1;
          return 0;
        });
        return { ...state, gamesOrdenados: orden, filtered: true };
      }
      return { ...state };

    case CLEAN_FILTERS:
      return {
        ...state,
        filtered: false,
        name: false,
        nameGame: {},
        gamesOrdenados: [],
      };

    case ERROR:
      return { ...state, message: action.payload };

    default:
      return { ...state };
  }
};

//   export default rootReducer;
