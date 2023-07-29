import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlataforms, getVideogames } from "../../redux/actions";
import style from "./Form.module.css";
import axios from "axios";
import { validate } from "./validate";
import { limpiarForm } from "./limpiarForm";
import { Link } from "react-router-dom";

function Form() {
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const [genresForm, setGenresForm] = useState([]);
  const [plataformsForm, setPlataformsForm] = useState([]);
  const [response, setResponse] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    platforms: [],
    image: "",
    released: "",
    rating: "",
    genre: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    released: "",
    rating: "",
    genre: [],
    response: "",
    errores: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setResponse("");

    if (property === "genre") {
      const checked = event.target.checked;
      console.log(form);
      if (checked) {
        setGenresForm([...genresForm, value]);
        setForm({ ...form, genre: [...genresForm, value] });
        setErrors(validate({ ...form, genre: [...genresForm, value] }));
      } else {
        const filtered = genresForm.filter((genre) => genre !== value);
        setGenresForm(filtered);
        setForm({ ...form, genre: [...filtered] });
        setErrors(validate({ ...form, genre: [...filtered] }));
      }
    } else if (property === "platforms") {
      console.log("pepe");
      const checked = event.target.checked;
      if (checked) {
        setPlataformsForm([...plataformsForm, value]);
        setForm({ ...form, platforms: [...plataformsForm, value] });
        setErrors(validate({ ...form, platforms: [...plataformsForm, value] }));
      } else {
        const filtered = plataformsForm.filter((plat) => plat !== value);
        setPlataformsForm(filtered);
        setForm({ ...form, platforms: [...filtered] });
        setErrors(validate({ ...form, platforms: [...filtered] }));
      }
    } else {
      setForm({ ...form, [property]: value });
      setErrors(validate({ ...form, [property]: value }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        errors.name ||
        errors.description ||
        errors.genre ||
        errors.platforms ||
        errors.released ||
        errors.rating
      ) {
        setErrors({ ...errors, errores: "Dede ingresar los datos" });
      } else {
        const response = (
          await axios.post("http://localhost:3001/videogames", form)
        ).data;
        const cleanedForm = limpiarForm();
        setForm(cleanedForm);
        setResponse(response);
      }
    } catch (error) {
      setErrors({ ...errors, response: error.response.data.error });
    }
  };
  const handleBackHomes = () => {
    dispatch(getVideogames());
  };
  return (
    <div className={style.mainConteiner}>
      <h1 className={style.titleForm}>Crea tu propio videogame</h1>
      <button className={style.buttonVolver} onClick={handleBackHomes}>
        <Link to="/home"> Volver Home </Link>
      </button>
      <br></br>
      {response && <span className={style.created}>{response}</span>}
      {errors.response && (
        <span className={style.mensajesError}>{errors.response}</span>
      )}
      {errors.errores && (
        <span className={style.mensajesError}>{errors.errores}</span>
      )}
      <br></br>
      <form onSubmit={handleSubmit} className={style.formConteiner}>
        <div className={style.contenedores}>
          <label className={style.labelDatos}>Nombre: </label>
          <input
            value={form.name}
            onChange={handleChange}
            name="name"
            placeholder="Ingrese un nombre.."
            className={style.inputDatos}
          />
          {errors.name && (
            <span className={style.mensajesError}>{errors.name}</span>
          )}
        </div>
        <div className={style.contenedores}>
          <label className={style.labelDatos}>Image: </label>
          <input
            value={form.image}
            onChange={handleChange}
            name="image"
            placeholder="ej: https:.."
            className={style.inputDatos}
          />
          {errors.image && (
            <span className={style.mensajesError}>{errors.image}</span>
          )}
        </div>

        <div className={style.contenedores}>
          <label className={style.labelDatos}>Descripción: </label>
          <textarea
            value={form.description}
            onChange={handleChange}
            name="description"
            placeholder="Debe contener entre 5 y 150 caracteres."
            className={style.inputDatos}
          />
          {errors.description && (
            <span className={style.mensajesError}>{errors.description}</span>
          )}
        </div>

        <div className={style.contenedores}>
          <label className={style.labelDatos}>Plataformas: </label>
          {platforms?.map((plat) => (
            <div>
              <label>{plat}</label>{" "}
              <input
                type="checkbox"
                name="platforms"
                onChange={handleChange}
                value={plat}
              ></input>
            </div>
          ))}
          {errors.platforms && (
            <span className={style.mensajesError}>{errors.platforms}</span>
          )}
        </div>
        <div className={style.contenedores}>
          <label className={style.labelDatos}>Fecha de lanzamiento: </label>
          <input
            type="date"
            name="released"
            onChange={handleChange}
            value={form.released}
            className={style.inputDatos}
          ></input>

          {errors.released && (
            <span className={style.mensajesError}>{errors.released}</span>
          )}
        </div>

        <div className={style.contenedores}>
          <label className={style.labelDatos}>Rating: </label>
          <input
            value={form.rating}
            onChange={handleChange}
            name="rating"
            placeholder="Ingrese un número"
            className={style.inputDatos}
          />
          {errors.rating && (
            <span className={style.mensajesError}>{errors.rating}</span>
          )}
        </div>

        <div className={style.contenedores}>
          <label className={style.labelDatos}>Géneros: </label>
          {genres?.map((genre, i) => (
            <div key={i}>
              <label for={genre} className={style.labelDatosBoxes}>
                {genre}
              </label>
              <input
                id={i}
                type="checkbox"
                name="genre"
                onChange={handleChange}
                value={genre}
                className={style.checkBoxes}
              />
            </div>
          ))}
          {errors.genre && (
            <span className={style.mensajesError}>{errors.genre}</span>
          )}
        </div>

        <button className={style.buttonSubmit}>Enviar</button>
      </form>
    </div>
  );
}

export default Form;
