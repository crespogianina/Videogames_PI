const axios = require("axios");
const { Genres } = require("../db");

//Datos sensibles
require("dotenv").config();
const { URL, API_KEY } = process.env;

//trae y limpia los genres de la API
const getGenresAPI = async () => {
  const gamesRaw = (await axios.get(`${URL}?key=${API_KEY}`)).data.results;
  let genresAux = [];
  const genresRaw = gamesRaw.map((game) =>
    game.genres.map((genre) => (genresAux = [...genresAux, genre.name]))
  );
  const genres = Array.from(new Set(genresAux));
  genres.map((genre) => Genres.findOrCreate({ where: { name: genre } }));

  return genres;
};

//Retorna los genres (si no existen los agrega)
const genresDB = async () => {
  const genres = await Genres.findAll();

  if (!genres.length) {
    const genresAPI = await getGenresAPI();
    return genresAPI;
  }

  const cleanGenre = genres.map((genre) => genre.dataValues.name);
  return cleanGenre;
};

module.exports = {
  genresDB,
};
