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
  getPlataforms,
} from "../../redux/actions";

//styles
import style from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  //variables
  const ITEMS_PER_PAGE = 15;

  //Hooks
  const dispatch = useDispatch();

  //estados redux
  const allVideogames = useSelector((state) => state.allVideogames);
  const copyGames = useSelector((state) => state.copyGames);
  const nameGame = useSelector((state) => state.nameGame);
  const genres = useSelector((state) => state.genres);
  const gamesOrdenados = useSelector((state) => state.gamesOrdenados);
  const message = useSelector((state) => state.message);
  const name = useSelector((state) => state.name);

  const ordenados = useSelector((state) => state.ordenados);
  const filtrados = useSelector((state) => state.filtrados);

  //states
  const [currentPage, setCurrentPage] = useState(0);
  const [selectors, setSelectors] = useState({
    Géneros: "",
    Datos: "",
    Orden: "",
    Rating: "",
  });

  console.log(name);

  const [items, setItems] = useState(
    [...allVideogames]?.splice(0, ITEMS_PER_PAGE)
  );

  const [itemsFiltered, setItemsFiltered] = useState(
    [...copyGames]?.splice(0, ITEMS_PER_PAGE)
  );

  //ciclo de vida
  useEffect(() => {
    if (!allVideogames.length) {
      dispatch(getVideogames());
      dispatch(getGenres());
      dispatch(getPlataforms());
    }
  }, []);

  useEffect(() => {
    if (!ordenados && !filtrados) {
      console.log(1);
      setItems([...allVideogames]?.splice(0, ITEMS_PER_PAGE));
      setCurrentPage(0);
    }
    if (ordenados && !filtrados && !name) {
      console.log(2);
      setItems([...copyGames]?.splice(0, ITEMS_PER_PAGE));
      setCurrentPage(0);
    }
    if (ordenados && filtrados && !name) {
      console.log(3);
      setItems([...gamesOrdenados]?.splice(0, ITEMS_PER_PAGE));
      setCurrentPage(0);
    }
    if (!ordenados && filtrados && !name) {
      console.log(4);
      setItems([...gamesOrdenados]?.splice(0, ITEMS_PER_PAGE));
      setCurrentPage(0);
    }
    if (!!name) {
      console.log(88);
      setItems([...nameGame]?.splice(0, ITEMS_PER_PAGE));
      setCurrentPage(0);
    }
  }, [allVideogames, copyGames, gamesOrdenados, nameGame]);

  //funciones
  //*paginado
  const prevPage = () => {
    if (!!name) return;
    if (!ordenados && !filtrados) {
      const prev = currentPage - 1;
      const firstIndex = prev * ITEMS_PER_PAGE;
      console.log(prev);
      if (prev < 0) return;
      setItems([...allVideogames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev);
      return;
    }
    if (ordenados && !filtrados) {
      const prev = currentPage - 1;
      console.log(prev);
      const firstIndex = prev * ITEMS_PER_PAGE;
      if (prev < 0) return;
      setItems([...copyGames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev);
      return;
    }
    if (filtrados) {
      const prev = currentPage - 1;
      console.log(prev);
      const firstIndex = prev * ITEMS_PER_PAGE;
      if (prev < 0) return;
      setItems([...gamesOrdenados].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev);
      return;
    }
  };

  const nextPage = () => {
    if (!!name) return;
    if (!ordenados && !filtrados) {
      const next = currentPage + 1;
      const firstIndex = next * ITEMS_PER_PAGE;
      if (firstIndex >= allVideogames.length) return;
      setItems([...allVideogames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next);
      return;
    }
    if (ordenados && !filtrados) {
      const next = currentPage + 1;
      const firstIndex = next * ITEMS_PER_PAGE;
      if (firstIndex >= copyGames.length) return;
      setItems([...copyGames].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next);
      return;
    }
    if (filtrados) {
      const next = currentPage + 1;
      const firstIndex = next * ITEMS_PER_PAGE;
      if (firstIndex >= gamesOrdenados.length) return;
      setItems([...gamesOrdenados].splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next);
      return;
    }
  };

  //filtros y ordenamientos
  const handleSelect = (event) => {
    const nameSelect = event.target.name;
    const valueSelect = event.target.value;

    if (nameSelect === "Géneros") dispatch(orderGenres(valueSelect));
    if (nameSelect === "Datos") dispatch(filterGames(valueSelect));
    if (nameSelect === "Orden") dispatch(orderGames(valueSelect));
    if (nameSelect === "Rating") dispatch(orderRating(valueSelect));
    setSelectors({ ...selectors, [nameSelect]: valueSelect });
  };

  //ver q onda
  const handleClean = () => {
    dispatch(cleanFilters());
    setSelectors({ Géneros: "", Datos: "", Orden: "", Rating: "" });
    setCurrentPage(0);
  };

  return (
    <div className={style.home}>
      <h1 className={style.homeTitle}>Home</h1>

      <div className={style.ordenadores}>
        <div className={style.generos}>
          <button className={style.reseat} onClick={handleClean}>
            Resetear
          </button>
          <label>Géneros</label>
          <select
            onChange={handleSelect}
            name="Géneros"
            value={selectors.Géneros}
          >
            <option defaultChecked>-</option>
            <option>ALL</option>
            {genres?.map((genre) => (
              <option value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className={style.generos}>
          <label>Datos </label>
          <select onChange={handleSelect} name="Datos" value={selectors.Datos}>
            <option defaultChecked>-</option>
            <option>ALL</option>
            <option>API</option>
            <option>DB</option>
          </select>
        </div>
        <div className={style.generos}>
          <label>Orden</label>
          <select onChange={handleSelect} name="Orden" value={selectors.Orden}>
            <option defaultChecked>-</option>
            <option>Ascendente</option>
            <option>Descendente</option>
          </select>
        </div>
        <div className={style.generos}>
          <label>Rating</label>
          <select
            onChange={handleSelect}
            name="Rating"
            value={selectors.Rating}
          >
            <option defaultChecked>-</option>
            <option>Ascendente</option>
            <option>Descendente</option>
          </select>
        </div>

        <button className={style.createGame}>
          <Link to="/create">Create videogame</Link>
        </button>
      </div>

      <SearchBar />
      {/* {message !== "" && <span>{message}</span>} */}
      {items.length ? (
        <>
          <CardsList videogames={items} />
        </>
      ) : message === "" ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
          alt="Loading"
          className={style.imgLoading}
        />
      ) : (
        <span className={style.notFiltered}>{message}</span>
      )}
      <div className={style.paginado}>
        <button onClick={prevPage}>Prev</button>
        <label>{currentPage + 1}</label>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
export default Home;
