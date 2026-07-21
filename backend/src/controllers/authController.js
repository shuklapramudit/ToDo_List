import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    createUser,
    getUserByEmail
} from "../models/userModel.js";

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingUser = await getUserByEmail(email);

        if (Array.isArray(existingUser) && existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await createUser(name, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                id: result.insertId,
                name,
                email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const user = await getUserByEmail(email);

        if (!Array.isArray(user) || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                success: false,
                message: "JWT_SECRET is not configured."
            });
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                email: user[0].email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    registerController,
    loginController
};