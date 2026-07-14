import express from "express";

import {
  register,
  getCurrentUser,
  login,
  logout,
} from "../controllers/auth.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

export default router;