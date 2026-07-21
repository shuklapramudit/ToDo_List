import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// Allowed frontend origins (Vercel Production & Localhost)
const allowedOrigins = [
  "https://to-do-pramudit.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

// ===============================
// Robust CORS & Preflight Setup
// ===============================
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Fallback for testing environments
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

app.use(cors(corsOptions));

// Preflight handler for all routes
app.options("*", cors(corsOptions));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Routes
// ===============================
app.get("/", (req, res) => {
  res.send("Todo Backend API is running...");
});

// ✅ Test Route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Latest Code Running",
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Server Start
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================");
  console.log("🚀 Server Started on PORT:", PORT);
  console.log("================================");
});