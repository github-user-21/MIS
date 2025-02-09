const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {authenticateUser} = require("../middleware/authMiddleware");


console.log(authController);  


router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/profile", authenticateUser, authController.profile);

module.exports = router;
