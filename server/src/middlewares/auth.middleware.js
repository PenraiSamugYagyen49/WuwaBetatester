const User = require("../models/user.model");
const { verifyToken } = require("../utils/token");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    if (!token) return res.status(401).json({ message: "Authentication token is required" });

    const { sub } = verifyToken(token);
    const user = await User.findById(sub);
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired authentication token" });
  }
};

module.exports = { requireAuth };
