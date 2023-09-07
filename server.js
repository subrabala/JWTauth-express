const express = require("express");
const app = express();

const usercontroller = require("./controllers/usercontroller");
const moviecontroller = require("./controllers/moviecontroller");
const authcontroller = require("./middleware/authcontroller");

const cors = require("cors");
const privilegechecker = require("./middleware/privilegechecker");

app.use(express.json());
app.use(cors("*"));

app.post("/signup", usercontroller.addUser);
app.post("/login", authcontroller.userLogin);

app.use(authcontroller.authenticateToken);

// ROUTES

app.get("/user", usercontroller.getUsers);

app.put(
  "/user/:id",
  privilegechecker.privilegechecker,
  usercontroller.updateUser
);

app.delete(
  "/user/:id",
  privilegechecker.privilegechecker,
  usercontroller.deleteUser
);

app.get("/movie", moviecontroller.getMovies);

app.post("/movie", privilegechecker.privilegechecker, moviecontroller.addMovie);

app.listen(3000, () => "listening to port 3000");

// prometheus - honeypot
