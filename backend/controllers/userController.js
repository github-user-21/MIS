const db = require("../db");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute("SELECT user_id, username, email, role_type FROM users");
        res.status(200).json(users);
    } catch (err) {
        console.error("Error in getAllUsers:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.ID;

        const [user] = await db.execute("SELECT ID, name, email, role FROM users WHERE ID = ?", [userId]);

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user[0]);
    } catch (err) {
        console.error("Error in getUserProfile:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update user profile (Self update)
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.ID;
        const { name, email } = req.body;

        await db.execute("UPDATE users SET name = ?, email = ? WHERE ID = ?", [name, email, userId]);

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        console.error("Error in updateUserProfile:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        await db.execute("DELETE FROM users WHERE ID = ?", [userId]);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error in deleteUser:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
