import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ===============================
// Bulletproof CORS Configuration
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://to-do-list-rust-eta-49.vercel.app",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ""));
}

const corsOptions = {
  origin: (origin, callback) => {
    // Postman/Server-to-server requests ke liye
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");

    if (isAllowed) {
      callback(null, true);
    } else {
      // ❌ DON'T pass new Error() - pass false so CORS header isn't broken
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200, // Legacy browsers handling
};

// Apply CORS to all routes and preflight requests
app.use(cors(corsOptions));
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
// Global Error Handling Middleware
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ===============================
// Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================");
  console.log("🚀 Server Started on PORT:", PORT);
  console.log("================================");
});