const express = require("express");
const app = express();

const usercontroller = require("./controllers/usercontroller");
const moviecontroller = require("./controllers/moviecontroller");
const authcontroller = require("./middleware/authcontroller");

const cors = require("cors");
const privilegechecker = require("./middleware/privilegechecker");

app.use(express.json());
app.use(cors("*"));

app.get("/user", usercontroller.getUsers);

app.post("/signup", usercontroller.addUser);

app.post("/login", authcontroller.userLogin);

app.put("/:id", usercontroller.updateUser);

app.delete("/user/:id", usercontroller.deleteUser);

app.get("/movie", moviecontroller.getMovies);

app.post(
  "/movie",
  authcontroller.authenticateToken,
  privilegechecker.privilegechecker,
  moviecontroller.addMovie
);

app.listen(3000, () => "listening to port 3000");
