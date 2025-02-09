const db = require("../db");

exports.enrollCourse = async (req, res) => {
    try {
        const {studentId, courseId, secId, semester, year } = req.body;
        // const studentId = req.user.id;

        const [existingEnrollment] = await db.execute("SELECT * FROM takes WHERE ID = ? AND course_id= ? AND sec_id = ? AND semester = ? AND year = ?", [studentId, courseId, secId,semester,year]);

        if(existingEnrollment.length > 0) {
            return res.status(400).json({error: "Already enrolled in this course"});
        }

        await db.execute("INSERT INTO takes (ID, course_id, sec_id, semester, year) VALUES (?,?,?,?,?)", [studentId,courseId, secId,semester,year]
        );

        res.status(201).json({message: "Enrolled successfully"});
    } catch(err) {
        console.err(err);
        res.status(500).json({error: err.message});
    }
};

exports.dropCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id;

        // Check if student is enrolled
        const [enrollment] = await db.execute(
            "SELECT * FROM takes WHERE ID = ? AND course_id = ?",
            [studentId, courseId]
        );
        if (enrollment.length === 0) {
            return res.status(404).json({ error: "Not enrolled in this course." });
        }


        await db.execute("DELETE FROM takes WHERE ID = ? AND course_id = ?", [studentId, courseId]);

        res.status(200).json({ message: "Course dropped successfully" });
    } catch (err) {
        console.error("Error in dropCourse:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try{
        const studentId = req.user.id;
        const [courses] = await db.execute(
            "SELECT c.course_id, c.title, c.dept_name, c.credits FROM takes t "+ "JOIN course c ON t.course_id = c.course_id WHERE t.ID= ?",[studentId]
        );

        res.status(200).json(courses);
    }catch(err){
        console.error("", err);
        res.status(500).json({error: err});
    }
};

exports.getAllEnrollments = async (req, res) => {
    try {
        const [enrollments] = await db.execute(
            "SELECT t.ID, s.name, t.course_id, c.title, t.sec_id, t.semester, t.year " +
            "FROM takes t JOIN student s ON t.ID = s.ID JOIN course c ON t.course_id = c.course_id"
        );

        res.status(200).json(enrollments);
    } catch (err) {
        console.error("Error in getAllEnrollments:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

