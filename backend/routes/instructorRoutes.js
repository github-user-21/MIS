const express = require("express");
const router = express.Router();

const instuctorController = require("../controllers/instructorController");

const {authenticateUser,authenticateInstructor} = require("../middleware/authMiddleware");

router.get("/courses", authenticateUser,authenticateInstructor,instuctorController.assignedCourses);

router.post("/students", authenticateUser,authenticateInstructor,instuctorController.courseStudents);

router.get("/advisors", authenticateUser, authenticateInstructor,instuctorController.getAdvisors);

router.post("/grade",authenticateUser,authenticateInstructor,instuctorController.submitGrades);

module.exports = router;
