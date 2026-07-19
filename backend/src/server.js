import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors"
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Todo Backend API is running...");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});