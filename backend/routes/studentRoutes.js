const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {authenticateUser,authenticateStudent} = require("../middleware/authMiddleware");

router.get("/profile",authenticateUser,authenticateStudent, studentController.viewProfile);
router.get("/available",authenticateUser,authenticateStudent,studentController.viewAvailableCourses);
router.post("/enroll",authenticateUser,authenticateStudent,studentController.enrollCourses);
router.get("/enrolled",authenticateUser,authenticateStudent,studentController.viewEnrolledCourses);
router.get("/grades",authenticateUser,authenticateStudent,studentController.viewGrades);

module.exports = router;