const express = require("express");
const { signup, login, logout, getMe, resetPassword, resetRequest, inviteNewUser, changePassword } = require("../controllers/authController.js");
const { protectRoute } = require("../middlewares/protectRoutes.js");

const router = express.Router();

// Routes
router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/request-reset", resetRequest);
router.put("/change-password",protectRoute, changePassword);
router.post("/reset-password/:token", resetPassword);
router.post("/invite",protectRoute, inviteNewUser);

// Export the router
module.exports = router;
