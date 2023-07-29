const genresRouter = require("express").Router();
const { getGenres } = require("../handlers/genresHandler");

//obtiene arreglo de genres de la API, los guarda en la db y luego consumirlos desde alli
genresRouter.get("/", getGenres);

module.exports = genresRouter;
