//models
const { Genres, Videogame } = require("../db");
const deleteGameDB = async (id) => {
  const game = await Videogame.findByPk(id);
  if (!game) return `No existe un videogame con el id: ${id}`;
  game.destroy();
  return `El videogame con el id: ${id} ha sido borrado con éxito`;
};

module.exports = { deleteGameDB };
