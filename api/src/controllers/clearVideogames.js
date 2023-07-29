//Limpia los datos de la API o bd para el Home
const clearVideoGameHome = (videogame) => {
  const newGame = {
    id: videogame.id,
    name: videogame.name,
    image: videogame.background_image || videogame.image,
    genre: videogame.genres?.map((genre) => genre.name) || videogame.Genres,
    created: videogame.created || false,
    rating: videogame.rating,
  };

  return newGame;
};

//Limpia los videogames traidos de la api para el datail
const clearVideogameApi = (videogame) => {
  const cleanedDescrip = videogame.description.replace(/<[^>]+>/g, "");

  const game = {
    id: videogame.id,
    name: videogame.name,
    image: videogame.background_image,
    plataforms: videogame.parent_platforms.map(
      (plataform) => plataform.platform.name
    ),
    description: cleanedDescrip.replace(/\n/g, ""),
    released: videogame.released,
    rating: videogame.rating,
    genres: videogame.genres?.map((genre) => genre.name),
    created: false,
  };

  return game;
};

//limpia los videojuegos traidos de la db para el detail
const clearGameDetail = (videogame) => {
  const newGame = {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description,
    platforms: videogame.platforms,
    image: videogame.background_image || videogame.image,
    genre: videogame.genres?.map((genre) => genre.name) || videogame.genre,
    released: videogame.released,
    rating: videogame.rating,
    created: videogame.created || false,
  };
  return newGame;
};

module.exports = {
  clearVideoGameHome,
  clearVideogameApi,
  clearGameDetail,
};
