const db = require("../db");

exports.createCourse = async (req, res) => {
    try {
        const { courseId, title, deptName, credits } = req.body;
        console.log(courseId,title,deptName,credits);

        const [existingCourse] = await db.execute("SELECT * FROM course WHERE course_id = ?", [courseId]);
        if (existingCourse.length > 0) {
            return res.status(400).json({ error: "Course already exists." });
        }

        await db.execute(
            "INSERT INTO course (course_id, title, dept_name, credits) VALUES (?, ?, ?, ?)",
            [courseId, title, deptName, credits]
        );

        res.status(201).json({ message: "Course created successfully", courseId });
    } catch (err) {
        console.error("Error in createCourse:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};


exports.getCourses = async (req, res) => {
    try {
        const [courses] = await db.execute("SELECT * FROM course");
        res.status(200).json(courses);
    } catch (err) {
        console.error("Error in getCourses:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const [course] = await db.execute("SELECT * FROM course WHERE course_id = ?", [courseId]);

        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course[0]);
    } catch (err) {
        console.error("Error in getCourseById:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, credits } = req.body;

        const [course] = await db.execute("SELECT * FROM course WHERE course_id = ?", [courseId]);
        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        await db.execute("UPDATE course SET title = ?, credits = ? WHERE course_id = ?", [title, credits, courseId]);
        res.status(200).json({ message: "Course updated successfully" });
    } catch (err) {
        console.error("Error in updateCourse:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const [course] = await db.execute("SELECT * FROM course WHERE course_id = ?", [courseId]);
        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        await db.execute("DELETE FROM course WHERE course_id = ?", [courseId]);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("Error in deleteCourse:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.getSectionsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const [sections] = await db.execute("SELECT * FROM section WHERE course_id = ?", [courseId]);

        res.status(200).json(sections);
    } catch (err) {
        console.error("Error in getSectionsByCourse:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.getStudentsInSection = async (req, res) => {
    try {
        const { courseId, secId } = req.params;

        const [students] = await db.execute(
            "SELECT s.ID, s.name FROM student s INNER JOIN takes t ON s.ID = t.ID WHERE t.course_id = ? AND t.sec_id = ?",
            [courseId, secId]
        );

        res.status(200).json(students);
    } catch (err) {
        console.error("Error in getStudentsInSection:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.createSection = async (req, res) => {
    try {
        const { courseId, secId, semester, year, building, roomNumber, timeSlotId } = req.body;

        const [existingSection] = await db.execute(
            "SELECT * FROM section WHERE course_id = ? AND sec_id = ? AND semester = ? AND year = ?",
            [courseId, secId, semester, year]
        );
        if (existingSection.length > 0) {
            return res.status(400).json({ error: "Section already exists" });
        }

        await db.execute(
            "INSERT INTO section (course_id, sec_id, semester, year, building, room_number, time_slot_id) VALUES (?,?,?,?,?,?,?)",
            [courseId, secId, semester, year, building, roomNumber, timeSlotId]
        );

        res.status(201).json({ message: "Section created successfully", sectionId: secId });
    } catch (err) {
        console.error("Error in createSection:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};
