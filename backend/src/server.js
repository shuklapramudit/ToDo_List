import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ===============================
// CORS Configuration
// ===============================
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://to-do-list-rust-eta-49.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

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
// Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================");
  console.log("Server Started");
  console.log("PORT:", PORT);
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_PORT:", process.env.DB_PORT);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_NAME:", process.env.DB_NAME);
  console.log("================================");
});