//DOTENV
const { API_KEY } = process.env;

//Funciones Helpers
const {
  getVideogameId,
  getAllVideogames,
  getAllPlatforms,
} = require("../controllers/getVideogamesController.js");

const { createVideogame } = require("../controllers/createVideogame");

const { deleteGameDB } = require("../controllers/deleteGame.js");
const { modificarVideogame } = require("../controllers/putVideogames.js");

//trae todos los videogames paginados en 100
const getVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const allGames = await getAllVideogames(name);

    if (allGames.includes("No")) return res.status(404).send(allGames);
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const videogame = await getVideogameId(idVideogame);

    return res.status(200).json(videogame);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//crea un nuevo videogame en la db
const postVideogame = async (req, res) => {
  const { name, description, platforms, image, released, rating, genre } =
    req.body;

  try {
    if (
      !name |
      !description |
      !platforms |
      !image |
      !released |
      (rating === undefined) |
      !genre
    )
      throw Error("Missing data");

    const createdGame = await createVideogame(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genre
    );

    return res.status(200).send(createdGame);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteGameDB(id);
    return res.status(200).send(deleted);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const putVideogame = async (req, res) => {
  const { id } = req.params;
  try {
    const videogameModified = await modificarVideogame(req.body, id);
    if (!videogameModified) throw Error(error);

    return res.status(200).json(videogameModified);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPlataforms = async (req, res) => {
  try {
    const videogames = await getAllPlatforms();
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getVideogames,
  getVideogameById,
  postVideogame,
  deleteVideogame,
  putVideogame,
  getPlataforms,
};
