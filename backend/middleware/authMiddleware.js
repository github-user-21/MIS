const jwt = require("jsonwebtoken");

// Middleware to authenticate the user using JWT
exports.authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        console.log("Decoded User:", decoded);
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Middleware to check if the user is a student
exports.authenticateStudent = (req, res, next) => {
    console.log(req.user);

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data found" });
    }

    if (req.user.role !== "student") {
        console.log("Role Found:", req.user.role);
        return res.status(403).json({ message: "Access Denied: Only students can perform this action" });
    }

    next();
};

// Middleware to allow only specific roles (like "instructor") to access certain routes
exports.authorizedRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied: Insufficient permissions" });
        }
        next();
    };
};

// Custom middleware to ensure the user is an instructor
exports.authenticateInstructor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data found" });
    }

    if (req.user.role !== "instructor") {
        console.log("Role Found:", req.user.role);
        return res.status(403).json({ message: "Access Denied: Only instructors can perform this action" });
    }

    next();
};

exports.authenticateAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data found" });
    }

    if (req.user.role !== "admin") {
        console.log("Role Found:", req.user.role);
        return res.status(403).json({ message: "Access Denied: Only Admin can perform this action" });
    }

    next();
};