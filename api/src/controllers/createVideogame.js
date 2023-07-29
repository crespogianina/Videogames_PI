//models
const { Genres, Videogame } = require("../db");

//crea un videogame y a su vez lo asocia con los genres
const createVideogame = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genre
) => {
  const created = await Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  if (!created) throw Error("Surgió un error");

  const genreDB = await Promise.all(
    genre.map(
      async (gen) => await Genres.findOrCreate({ where: { name: gen } })
    )
  );

  genreDB.map((genre) => created.addGenres(genre[0].dataValues.id));

  return `El videogame ${name} se creo con exito`;
};

module.exports = {
  createVideogame,
};
