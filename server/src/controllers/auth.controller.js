const User = require("../models/user.model");
const { signToken } = require("../utils/token");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  profile: user.profile || null,
});

const createSession = (user, status, res) => {
  const token = signToken({ sub: user._id.toString(), email: user.email });
  res.status(status).json({ token, user: publicUser(user) });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return res.status(400).json({ message: "Please provide a valid email address" });
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists" });

    const user = await User.create({ name, email: normalizedEmail, password });
    createSession(user, 201, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }
    createSession(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const me = (req, res) => res.json({ user: publicUser(req.user) });

module.exports = { register, login, me };
