//creacion de la ruta
const videoGamesRouter = require("express").Router();

//importacion de handlers
const {
  getVideogames,
  getVideogameById,
  postVideogame,
  deleteVideogame,
  putVideogame,
  getPlataforms,
} = require("../handlers/videogamesHandler");

//!Rutas
//traer un arrgelo de objetos con los videojuegos
videoGamesRouter.get("/", getVideogames);

//trae las plataformas de la API
videoGamesRouter.get("/platforms", getPlataforms);

//obtiene el detalle de un videogame (recibe por id), incluye datos de lo generos asociados, para API y db
videoGamesRouter.get("/:idVideogame", getVideogameById);

//crea un videogame en la db y relaciona los generos
videoGamesRouter.post("/", postVideogame);

//elimina un videogame de la db
videoGamesRouter.delete("/:id", deleteVideogame);

//modifica datos de un videogame
videoGamesRouter.put("/:id", putVideogame);

module.exports = videoGamesRouter;
