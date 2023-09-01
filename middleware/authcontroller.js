const prisma = require("../prisma/client");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const userLogin = async (req, res, next) => {
  const providedUsername = req.body.firstname;
  const providedPassword = req.body.password;
  try {
    const user = await prisma.user.findFirst({
      where: { firstname: providedUsername },
    });
    if (!user) {
      return res.sendStatus(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(providedPassword, user.password);

    if (!passwordMatch) {
      return res.sendStatus(401).json({ error: "Invalid password" });
    }

    const token = generateToken({ userId: user.userId });
    res.json({ accessToken: token });
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: "Internal Server Error" });
  }
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401).json({ error: "Token not available" });

  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403).json({ error: "Forbidden" });
      req.body.creatorId = user.userId;
      next();
    });
  } catch (err) {
    return res.sendStatus(500).json({ error: "Internal Server Error" });
  }
}

function generateToken(uid) {
  return jwt.sign(uid, process.env.TOKEN_SECRET, { expiresIn: "3000s" });
}

module.exports = {
  authenticateToken,
  userLogin,
};
