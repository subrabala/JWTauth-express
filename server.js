const express = require("express");
const app = express();

const usercontroller = require("./controllers/usercontroller");
const moviecontroller = require("./controllers/moviecontroller");
const authcontroller = require("./controllers/authcontroller")

const cors = require("cors");

app.use(express.json());
app.use(cors("*"));

app.get("/user", usercontroller.getUsers);

app.post("/signup", usercontroller.addUser);

app.post("/login", authcontroller.verifyUser);

app.post("/logout", authcontroller.verifyUser);

app.put("/:id", usercontroller.updateUser);

app.delete("/:id", usercontroller.deleteUser);

app.get("/movie", moviecontroller.getMovies);

app.post("/movie", authcontroller.authenticateToken, moviecontroller.addMovie);

app.listen(3000, () => "listening to port 3000");
