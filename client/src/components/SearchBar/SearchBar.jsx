import { useState } from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../redux/actions";

function SearchBar() {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(input);
    if (input === "") return;
    if (input !== "") {
      dispatch(getVideogameByName(input));
      setInput("");
    }
  };

  return (
    <div className={style.searchBar}>
      <nav>
        <input
          placeholder="Ingresar un videogame..."
          onChange={handleChange}
          value={input}
        ></input>
        <button onClick={handleSubmit}>Buscar</button>
      </nav>
    </div>
  );
}
export default SearchBar;
