const prisma = require("../prisma/client");

async function privilegechecker(req, res, next) {
  try {
    const { creatorId } = req.body;
    const user = await prisma.user.findUnique({ where: { userId: creatorId } });
    if (!user || user.privilege !== 1) {
      return res.sendStatus(403).json({ error: "Not privileged enough" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  privilegechecker,
};
