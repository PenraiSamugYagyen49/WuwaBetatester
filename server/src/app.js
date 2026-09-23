const express = require("express");
const cors = require("cors");
const trackRoutes = require("./routes/track.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/error.middleware");
const app = express();
// 1. Global middleware
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").map(origin => origin.trim()).filter(Boolean);
app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)) }));
app.use(express.json({ limit: "64kb" }));
// 2. Routes
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/uploads", uploadRoutes);
// 3. Error handling — must be LAST
app.use(notFound);
app.use(errorHandler);
module.exports = app;
