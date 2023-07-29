import { useLocation } from "react-router-dom";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ id, name, image, genre }) {
  const { pathname } = useLocation();

  return (
    <div className={style.cardConteiner}>
      <img src={image} className={style.imageDetail} alt={name} />
      <Link to={`/detail/${id}`}>
        <h2 className={style.header}>Nombre: {name}</h2>
      </Link>

      <div className={style.cardText}>
        <ul>
          Géneros:
          {genre?.map((genre) => (
            <li>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Card;
