const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const {authenticateUser, authenticateAdmin, authenticateAdmin, authorizedRoles, authenticateStudent} = require("../middleware/authMiddleware");

router.post("/enroll",authenticateUser,authenticateStudent,enrollmentController.enrollCourse);

router.get("/mycourses",authenticateUser,authenticateStudent,enrollmentController.getEnrolledCourses);

// router.delete("/drop/:",authenticateUser,authenticateStudent,)

router.get("/all", authenticateUser, authenticateAdmin, enrollmentController.getAllEnrollments);

