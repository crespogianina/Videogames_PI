import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getGameDetail } from "../../redux/actions";
import style from "./Detail.module.css";
import axios from "axios";
import { getVideogames } from "../../redux/actions";
import editar from "../../images/editar.png";

function Detail() {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const [gameDeleted, setGameDeleted] = useState("");
  const [newGame, setNewGame] = useState({});
  const [gameModif, setGameModif] = useState({});

  const [modificar, setModificar] = useState(false);

  useEffect(() => {
    dispatch(getGameDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, []);

  const handleModificacion = () => {
    console.log("hola");
    setModificar(true);
  };

  const handleDelete = async () => {
    try {
      const response = (
        await axios.delete(`http://localhost:3001/videogames/${id}`)
      ).data;
      dispatch(getVideogames());
      dispatch(cleanDetail(id));
      setGameDeleted(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(game);

  return (
    <div className={style.mainConteinerDetail}>
      <div className={style.buttonConteiner}>
        <button className={style.volverHome}>
          <Link to="/home">Volver Home</Link>
        </button>
        <div className={style.buttons}>
          {game?.created && (
            <button onClick={handleDelete} className={style.extras}>
              Eliminar
            </button>
          )}
          {game?.created && (
            <button className={style.extras} onClick={handleModificacion}>
              Modificar
            </button>
          )}
        </div>
      </div>
      {gameDeleted !== "" && (
        <span className={style.eliminado}>{gameDeleted}</span>
      )}

      {game.name ? (
        <div className={style.detail}>
          {game.created && (
            <img src={editar} className={style.imgEditar} alt="editar" />
          )}
          <h1>Nombre: {game.name}</h1>
          <img
            src={game.image}
            alt={game.name}
            width={"300px"}
            className={style.imagDetail}
          />
          <div className={style.textConteiner}>
            <h2 className={style.idGame}>ID: {game.id}</h2>
            <p className={style.descripDetail}>
              Descripción: {game.description}
            </p>
            <h2>Rating: {game.rating}</h2>
            <h2>Año de lanzamiento:{game.released}</h2>
            <div className={style.listas}>
              <ul>
                Plataformas:
                {game.plataforms?.map((plat) => (
                  <li>{plat}</li>
                ))}
                {game.platforms?.map((plat) => (
                  <li>{plat}</li>
                ))}
              </ul>
              <ul>
                Géneros:
                {game?.genres?.map((genre) => (
                  <li>{genre}</li>
                ))}
                {game?.genre?.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        gameDeleted === "" && (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            alt="Loading"
            className={style.imgLoading}
          />
        )
      )}
    </div>
  );
}
export default Detail;
