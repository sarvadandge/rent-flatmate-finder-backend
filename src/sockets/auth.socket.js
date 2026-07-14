import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

export const socketAuth = (socket, next) => {
    try {

        const authHeader = socket.handshake.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return next(new Error("Authentication required"));
        }

        const token = authHeader.substring(7);

        const decoded = verifyToken(token);

        socket.user = decoded;

        next();
    } catch (err) {
        console.error(err);
        next(new Error("Invalid token"));
    }
};