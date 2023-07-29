import Card from "../Card/Card";
import style from "./CardsList.module.css";

function CardsList({ videogames }) {
  return (
    <div className={style.cardList}>
      {videogames?.map(({ id, name, image, genre }) => (
        <Card key={id} id={id} name={name} image={image} genre={genre} />
      ))}
    </div>
  );
}
export default CardsList;
