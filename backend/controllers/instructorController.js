const db = require("../db");

exports.assignedCourses = async (req, res) => {
    try{
        const instructorId = req.user.id;
        console.log(instructorId);
        const query = `SELECT t.course_id,t.sec_id,t.semester,t.year FROM teaches t JOIN course c ON t.course_id = c.course_id WHERE t.ID = ?`;
        const [courses] = await db.execute(query,[instructorId]);

        res.json(courses);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};

exports.courseStudents = async (req, res) => {
    try {
        const {courseId, secId, semester, year} =req.body;
        const query = `SELECT s.ID,s.name,t.grade FROM takes t JOIN student s ON t.ID = s.ID WHERE t.course_id = ? AND t.sec_id = ? AND t.semester = ? AND t.year = ?`;

        const [students] = await db.execute(query,[courseId, secId, semester,year]);
        res.json(students);
    }catch(err){
        console.log(err);
        res.status(500).json({message : err});
    }
};

exports.submitGrades = async (req, res) => {
    try {
        const {studentId,courseId,secId,grade} = req.body;

        const query = `UPDATE takes JOIN section ON takes.course_id = section.course_id AND takes.sec_id = section.sec_id SET takes.grade = ? WHERE takes.ID = ? AND takes.course_id = ? AND takes.sec_id = ?`;

        await db.execute(query,[grade,studentId,courseId,secId]);
        res.json({message : "Grade submitted!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
};

exports.getAdvisors = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const query = `SELECT s.ID, s.name, s.dept_name FROM advisor a JOIN student s ON a.s_ID = s.ID WHERE a.i_ID = ?`;
        const [advisors] = await db.execute(query, [instructorId]);
        res.json(advisors);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
};