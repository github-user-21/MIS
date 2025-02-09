const db = require("../db");

exports.viewProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);

        const [student] = await db.execute(
            "SELECT ID, name, dept_name, total_creds FROM student WHERE ID = ?", [userId]
        );

        console.log(student);
        if (student.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ student: student[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

exports.viewAvailableCourses = async (req, res) => {
    try {
        const [courses] = await db.execute(`
            SELECT c.course_id, c.title, s.sec_id, s.semester, s.year 
            FROM course c
            JOIN section s ON c.course_id = s.course_id
        `);

        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

exports.enrollCourses = async (req, res) => {
    try {
        const { id, courseId, sectionId } = req.body;  // Ensure 'id' is fetched from request body
        const userId = id; // Assign userId correctly


        console.log(userId, courseId, sectionId);

        const [section] = await db.execute(
            "SELECT * FROM section WHERE course_id = ? AND sec_id = ?", [courseId, sectionId]
        );

        console.log(section);
        if (section.length === 0) {
            return res.status(404).json({ error: "Section not found" });
        }

        const semester = section[0].semester;
        const year = section[0].year;

        const [existingEnrollment] = await db.execute(
            "SELECT * FROM takes WHERE ID = ? AND course_id = ? AND sec_id = ?", [userId, courseId, sectionId]
        );

        if (existingEnrollment.length > 0) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }

        const [result] = await db.execute(
            "INSERT INTO takes (ID, course_id, sec_id, semester, year) VALUES (?,?,?,?,?)", [userId, courseId, sectionId, semester, year]
        );
        console.log(result);

        res.status(200).json({ message: 'Successfully enrolled in course' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// exports.dropCourse = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const { courseId, sectionId } = req.body;

//         console.log(userId, courseId, sectionId);

//         const [enrolled] = await db.execute("SELECT * FROM takes WHERE ID = ? AND course_id = ? AND sec_id = ?", [userId, courseId, sectionId]);

//         console.log(enrolled);

//         if (enrolled.length === 0) {
//             return res.status(400).json({ error: "You are not enrolled in this course" });
//         }

//         await db.execute("DELETE FROM takes WHERE ID = ? AND course_id = ? AND sec_id = ?", [userId, courseId, sectionId]);

//         res.status(200).json({ message: "Successfully dropped the course" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: err});
//     }
// };

exports.viewEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const [enrolledCourses] = await db.execute(`
            SELECT c.course_id, c.title, t.sec_id, t.semester, t.year
            FROM takes t
            JOIN course c ON t.course_id = c.course_id
            WHERE t.ID = ?
        `, [userId]);

        res.status(200).json(enrolledCourses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

exports.viewGrades = async (req, res) => {
    try {
        const userId = req.user.id;

        console.log(userId);

        const [grades] = await db.execute(
            "SELECT c.title, t.grade FROM takes t JOIN course c ON t.course_id = c.course_id WHERE t.ID = ?", [userId]
        );

        console.log(grades);

        if (grades.length === 0) {
            return res.status(404).json({ error: 'No grades found for this student' });
        }

        res.status(200).json(grades);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};