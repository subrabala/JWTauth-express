const prisma = require("../prisma/client");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


const verifyUser = async (req, res, next) => {
  const providedUsername = req.body.firstname;
  const providedPassword = req.body.password;
  try {
    const user = await prisma.user.findFirst({ where: { firstname: providedUsername } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(providedPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken({ providedUsername });
    res.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  try{
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403);
      req.user = user;
      next();
    });
  }
  catch(err){console.log(err);}
}

function generateToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "30s" });
}

module.exports = { verifyUser, authenticateToken };
