import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided.",
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format.",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify token with process.env.JWT_SECRET or fallback secret
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "default_jwt_secret_key"
        );

        // Attach decoded payload (contains user id) to req.user
        req.user = decoded;

        next();
    } catch (error) {
        console.error("❌ Auth Middleware Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

export default authMiddleware;