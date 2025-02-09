const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser, authenticateAdmin } = require("../middleware/authMiddleware");

// Get all users (Admin Only)
router.get("/", authenticateUser, authenticateAdmin, userController.getAllUsers);

// Get a user profile (Self or Admin)
router.get("/:userId?", authenticateUser, userController.getUserProfile);

// Update own profile
router.put("/update", authenticateUser, userController.updateUserProfile);

// Delete a user (Admin Only)
router.delete("/:userId", authenticateUser, authenticateAdmin, userController.deleteUser);

module.exports = router;
