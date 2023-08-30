const prisma = require("../prisma/client");

const getMovies = async (req, res) => {
  const allMovies = await prisma.movies.findMany();
  res.json(allMovies);
};

const addMovie = async (req, res) => {
  const newMovie = await prisma.movies.create({ data: req.body });
  res.json(newMovie);
};

module.exports = {
  getMovies,
  addMovie,
};
