const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); 

app.use("/auth", authRoutes);
app.use("/student",studentRoutes);
app.use("/instructor",instructorRoutes);
app.use("/course",courseRoutes);
app.use("/users",userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
