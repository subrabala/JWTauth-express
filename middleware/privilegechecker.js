const prisma = require("../prisma/client");

const routePermissions = {
  "/user": {
    GET: ["ADMIN"],
    POST: ["GUEST", "USER", "MANAGER", "ADMIN"],
  },
  "/user/:id": { UPDATE: ["USER", "MANAGER", "ADMIN"], DELETE: ["ADMIN"] },
  "/movie": {
    GET: ["GUEST", "USER", "MANAGER", "ADMIN"], // Allow GET requests
    POST: ["MANAGER", "ADMIN"], // Require authentication for POST
  },
};

async function privilegechecker(req, res, next) {
  try {
    // extracting userId passed by authenticateToken
    const { creatorId } = req.body;

    // fetching details of that user from userId in the DB
    const user = await prisma.user.findUnique({ where: { userId: creatorId } });

    // if user doesn't exist anymore
    if (!user) return res.sendStatus(404).json({ message: "User not found" });

    // Extract the :id parameter from the URL
    const userIdFromUrl = req.params.id;

    // taking the list of roles that can access this route
    
    const requiredRoles = routePermissions[req.path];
    console.log(routePermissions[req.path]);
    const methodRequiredRoles = requiredRoles && requiredRoles[req.method];
    console.log(methodRequiredRoles)
    if (methodRequiredRoles && methodRequiredRoles.includes(user.privilege)) {
      next();
    } else {
      res.status(403).json({ message: "Access denied if includes" });
    }
  } catch (error) {
    res.sendStatus(500).json({ message: "Privilege Error" });
  }
}

module.exports = {
  privilegechecker,
};
