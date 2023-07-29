import { Link } from "react-router-dom";
import style from "./Landing.module.css";

function Landing() {
  return (
    <div className={style.bodyArcade}>
      <div className={style.landigText}>
        <h1 className={style.tittle}>PI Videogames</h1>
        <p className={style.text}> Bienvenidos a la SPA de Videogames</p>

        <Link to="/home">
          <button className={style.buttonHome}>Ingresar</button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default Landing;
