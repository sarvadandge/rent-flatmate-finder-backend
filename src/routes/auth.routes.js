import express from "express";

import { register, getCurrentUser } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

export default router;