// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Authentication middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    // attach both for compatibility with different code styles
    req.userId = decoded.id;
    req.user = { id: decoded.id };
    next();// proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
