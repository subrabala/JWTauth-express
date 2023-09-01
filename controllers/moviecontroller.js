const prisma = require("../prisma/client");

const getMovies = async (req, res) => {
  const allMovies = await prisma.movies.findMany();
  res.json(allMovies);
};

const addMovie = async (req, res) => {
  try {
    const movie = req.body;
    console.log(movie, "if");
    try {
      const newMovie = await prisma.movies.create({
        data: { moviename: movie.moviename, creatorId: movie.creatorId },
      });
      console.log(newMovie, "new");
      res.json(newMovie);
    } catch (error) {
      res.sendStatus(403);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { getMovies, addMovie };
