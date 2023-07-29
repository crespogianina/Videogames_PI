//Requeridos
const axios = require("axios");
const { Op } = require("sequelize");

//Models
const { Genres, Videogame } = require("../db");

//Datos sensibles
require("dotenv").config();
const { URL, API_KEY } = process.env;

//funciones
const {
  clearVideoGameHome,
  clearVideogameApi,
  clearGameDetail,
} = require("./clearVideogames.js");

//*Controllers
//Hace el llamado a la API y retorna los videogames listos
const getVideoGamesApi = async () => {
  let i = 1;
  let videogames = [];

  while (i < 6) {
    const data = (await axios.get(`${URL}?key=${API_KEY}&page=${i}`)).data
      .results;
    videogames = [...videogames, ...data];
    i++;
  }

  const clearedGames = videogames.map((game) => clearVideoGameHome(game));
  return clearedGames;
};

//trae datos de la DB ya listos
const getVideogamesDB = async () => {
  const games = await Videogame.findAll({
    include: [
      {
        model: Genres,
        through: "games_genres",
      },
    ],
  });

  if (!games.length) return "No existen videogames en la base de datos";
  const cleanedGames = games.map((game) => clearVideoGameHome(game));

  return cleanedGames;
};

//trae a todos los videogames y tambien por query
const getAllVideogames = async (name) => {
  if (!name) {
    //trae todos los videogames
    const videogamesAPI = await getVideoGamesApi();
    const videogamesDB = await getVideogamesDB();

    if (videogamesDB.includes("No")) return videogamesAPI;

    let allGames = [...videogamesDB, ...videogamesAPI];
    return allGames;
  }

  //trae por query
  const getNameApi = await getNameVGApi(name);
  const getNameDB = await getNameVGDB(name);

  if (getNameDB.includes("No") && getNameApi.includes("No"))
    return `No existen videogames con el name: ${name}`;

  if (getNameApi.includes("No")) return getNameDB;

  if (getNameDB.includes("No")) return getNameApi.slice(0, 15);

  const allGames = [...getNameDB, ...getNameApi];

  return allGames.slice(0, 15);
};

//trae los videogames de la Api por el nombre ya listos
const getNameVGApi = async (name) => {
  const videogameRaw = (await axios.get(`${URL}?key=${API_KEY}&search=${name}`))
    .data.results;
  if (!videogameRaw.length)
    return `No existe un videogame con el name: ${name}`;
  const videogames = await videogameRaw.map((game) => clearVideoGameHome(game));
  return videogames;
};

const getNameVGDB = async (name) => {
  const gameDB = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [
      {
        model: Genres,
        through: "games_genres",
      },
    ],
  });
  if (!gameDB.length) return `No existe un videogame con el name: ${name}`;
  return gameDB.map((game) => clearVideoGameHome(game.dataValues));
};

//regex
const regexUUID =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
//trae el videogame
const getVideogameId = async (id) => {
  if (regexUUID.test(id)) {
    const gameDB = await getGameByIDDB(id);
    return gameDB;
  }
  if (!isNaN(id)) {
    const gameApi = await getGameByIDAPI(id);
    return gameApi;
  } else throw Error("Debe ingresar un id válido");
};

//trae el game por id de la api ya listo
const getGameByIDAPI = async (id) => {
  const videogameRaw = (await axios.get(`${URL}/${id}?key=${API_KEY}`)).data;

  return clearVideogameApi(videogameRaw);
};

//trae el game de la db por el id ya listo
const getGameByIDDB = async (id) => {
  const videogame = await Videogame.findByPk(id, {
    include: [
      {
        model: Genres,
        through: "games_genres",
      },
    ],
  });
  if (!videogame) throw Error(`No existe un videogame con el id: ${id}`);

  return clearGameDetail(videogame);
};

const getAllPlatforms = async () => {
  let i = 1;
  let videogames = [];

  while (i < 6) {
    const data = (await axios.get(`${URL}?key=${API_KEY}&page=${i}`)).data
      .results;
    videogames = [...videogames, ...data];
    i++;
  }

  return Array.from(
    new Set(videogames.map((game) => game.platforms[0].platform.name))
  );
};

module.exports = {
  getVideoGamesApi,
  getNameVGApi,
  getVideogamesDB,
  getGameByIDAPI,
  getGameByIDDB,
  getNameVGDB,
  getVideogameId,
  getAllVideogames,
  getAllPlatforms,
};
