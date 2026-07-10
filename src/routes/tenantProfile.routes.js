import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { createProfile } from "../controllers/tenantProfile.controller.js";

import { createTenantProfileSchema } from "../validators/tenantProfile.validator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize("TENANT"),
  validate(createTenantProfileSchema),
  createProfile
);

export default router;