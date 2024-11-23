const prisma = require("../db/prisma.js");

// Fetch all users
const getAllUsers = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authenticatedUserId,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Search for a user by username or email
const searchUser = async (req, res, next) => {
  try {
    const { searchQuery } = req.query;

    if (!searchQuery) {
      res.status(400);
      throw new Error("Search query is required");
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { fullName: { contains: searchQuery, mode: "insensitive" } },
          { email: { contains: searchQuery, mode: "insensitive" } },
        ],
      },
    });

    if (users.length === 0) {
      res.status(404);
      throw new Error("No users found");
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// update user record (authenticated user or admin)
const updateUser = async (req, res, next) => {
    try {
      const { id } = req.params; // The user ID to update
      const { fullName, email, role } = req.body; // The data to be updated
      console.log(id, fullName)
      // Check if the authenticated user is updating their own record or if the user is an admin
      if (req.user.id !== id && req.user.role !== "ADMIN") {
        res.status(403).json({ error: "Forbidden: You can only update your own record or be an admin" });
        return; // Ensure the function exits after sending the response
      }
  
      // Validate if any fields are provided for updating
      if (!fullName && !email && !role) {
        res.status(400).json({ error: "No data provided to update" });
        return; // Ensure the function exits after sending the response
      }
  
      // Prepare the data for updating
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          fullName: fullName || undefined, // If not provided, leave unchanged
          email: email || undefined, // If not provided, leave unchanged
          role: role || undefined, // If not provided, leave unchanged
        },
      });
  
      res.status(200).json(updatedUser); // Send back the updated user data
    } catch (error) {
      next(error); // Pass the error to the next error handling middleware
    }
  };
  
// Delete user record (authenticated user or admin)
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if the authenticated user is deleting their own record or if the user is an admin
    if (req.user.id !== id && req.user.role !== "ADMIN") {
      res.status(403);
      throw new Error("Forbidden");
    }

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  searchUser,
  updateUser,
  deleteUser,
};
