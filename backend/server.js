import express from "express";
import dotenv from "dotenv";
import db from "./src/config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 5000;
app.get("/", (req, res) => {
    res.send("🚀 Todo Backend API is running...");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});