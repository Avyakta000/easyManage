const jwt = require("jsonwebtoken");
const prisma = require("../db/prisma.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_auth;

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized - No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401);
      throw new Error("Unauthorized - Invalid Token");
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, fullName: true, role: true },
    });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    try {
      if (req.user.role !== "ADMIN") {
        res.status(403);
        throw new Error("Forbidden - You are not an admin");
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = { protectRoute, isAdmin };
