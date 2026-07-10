import express from "express";

import { register, getCurrentUser, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

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

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/owner-test",
  authMiddleware,
  authorize("OWNER"),
  (req, res) => {
    res.json({
      message: "Welcome Owner"
    });
  }
);
export default router;