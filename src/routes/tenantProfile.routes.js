import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { createProfile, getProfile, updateProfile } from "../controllers/tenantProfile.controller.js";

import { tenantProfileSchema } from "../validators/tenantProfile.validator.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("TENANT"),
    validate(tenantProfileSchema),
    createProfile
);

router.get(
    "/",
    authMiddleware,
    authorize("TENANT"),
    getProfile
);

router.put(
    "/",
    authMiddleware,
    authorize("TENANT"),
    validate(tenantProfileSchema),
    updateProfile
);
export default router;