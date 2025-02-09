const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.register = async (req, res) => {
    try {
        console.log("API Called",req.body);
        const { username, email, password, role } = req.body;
        console.log(username);

        // Check if the user already exists
        const [existingUser] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        // console.log(existingUser);
        if (existingUser && existingUser.length > 0) {
            console.log("exiting if");
            return res.status(400).json({ error: "Username already exists" });
        }
        console.log("idhar hu me");
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("made password");
        console.log("inserting");
        const [rows] = await db.execute(
            "INSERT INTO users (username, email, password, role_type) VALUES (?,?,?,?)",
            [username, email, hashedPassword, role]
        );

        console.log("rows:",rows);

        // Ensure insertId is available
        if (!rows || !rows.insertId) {
            throw new Error("User registration failed - No insertId returned");
        }

        res.status(201).json({ message: "User registered successfully", userId: rows.insertId });

    } catch (err) {
        console.error("Error in register function:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("api data: ",req.body);
        const { username, email, password } = req.body;
        console.log(username);
        const [user] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        console.log(user);
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user[0].password);
        console.log(match);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user[0].user_id, role: user[0].role_type },
            process.env.SECRET_KEY,
            { expiresIn: '5h' }
        );
        console.log(token);

        res.status(200).json({
            message: "Login successful",
            token: token,
            user_id: user[0].user_id,  // Send user_id from DB
            role: user[0].role_type    // Send role from DB
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error logging in user" });
    }
};

exports.profile = async (req, res) => {
    console.log("Into the profile route");

    try {
        console.log("Decoded JWT Payload:", req.user); // Debugging line

        const userId = req.user.id || req.user.user_id; // Adjust based on JWT payload
        if (!userId) {
            return res.status(400).json({ error: "User ID is missing in token" });
        }

        console.log("Extracted userId:", userId);

        const [user] = await db.execute("SELECT * FROM users WHERE user_id = ?", [userId]);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user[0]);
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ error: "Error fetching profile" });
    }
};
