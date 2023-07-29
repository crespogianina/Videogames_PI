const { genresDB } = require("../controllers/genresController");

const getGenres = async (req, res) => {
  try {
    const genres = await genresDB();

    return res.status(200).json(genres);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getGenres,
};
