const { clearGameDetail } = require("../controllers/clearVideogames");
const { Genres, Videogame } = require("../db");

const regexUUID =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const modificarVideogame = async (obj, id) => {
  const { name, description, platforms, image, genre, released, rating } = obj;
  if (!regexUUID.test(id)) throw Error("Debe ingresar un id válido");
  if (
    !name &&
    !description &&
    !platforms &&
    !image &&
    !genre &&
    !released &&
    !rating
  )
    throw Error("Debe ingresar los datos a cambiar");

  const videogame = await Videogame.findByPk(id, {
    include: [
      {
        model: Genres,
        through: "games_genres",
      },
    ],
  });
  if (!videogame) throw Error(`No existe un videogame con el id: ${id}`);

  //modificaciones
  for (let prop in obj) {
    if (obj[prop]) videogame[prop] = obj[prop];
    if (prop === "genre") {
      const genres = await getGenres(obj.genre);
      genres.map((genre) => videogame.setGenres(genre[0].dataValues.id));
    }
  }

  await videogame.save();
  return clearGameDetail(videogame);
};

const getGenres = async (arrGenres) => {
  return await Promise.all(
    await arrGenres.map(async (genre) => {
      const genres = await Genres.findOrCreate({
        where: { name: genre },
      });
      return genres;
    })
  );
};

module.exports = { modificarVideogame };
