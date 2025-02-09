const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const {
    authenticateAdmin,
    authenticateInstructor,
    authenticateUser,
    authorizedRoles
} = require("../middleware/authMiddleware");

router.post("/create", authenticateUser, authorizedRoles("admin", "instructor"), courseController.createCourse);

router.get("/", authenticateUser, courseController.getCourses);

router.get("/:courseId", authenticateUser, courseController.getCourseById);

router.put("/:courseId", authenticateUser, authenticateInstructor, courseController.updateCourse);

// router.delete("/:courseId", authenticateUser, authenticateAdmin, courseController.deleteCourse);

router.post("/section/create", authenticateUser, authenticateAdmin, courseController.createSection);

router.get("/sections/:courseId", authenticateUser, courseController.getSectionsByCourse);

// router.get("/:courseId/section/:secId/students",
//     authenticateUser,
//     authorizedRoles("admin", "instructor"),
//     courseController.getStudentsInSection
// );



module.exports = router;
