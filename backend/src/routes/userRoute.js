const express = require("express");
const { deleteUser, getAllUsers, searchUser, updateUser } = require("../controllers/userController.js");
const { protectRoute, isAdmin } = require("../middlewares/protectRoutes.js");

const router = express.Router();

// Fetch all users (requires admin)
router.get("/", protectRoute, isAdmin, getAllUsers);

// Search users (admin-only)
router.get("/search", protectRoute, isAdmin, searchUser);

// Update own user record (authenticated user or admin)
router.put("/:id", protectRoute, updateUser);

// Delete own user record (authenticated user or admin)
router.delete("/:id", protectRoute, deleteUser);

module.exports = router;