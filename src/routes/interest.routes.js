import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import { createInterest, getOwnerInterests, updateInterestStatus } from "../controllers/interest.controller.js";
import { updateInterestStatusSchema } from "../validators/interest.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post(
    "/:listingId",
    authMiddleware,
    authorize("TENANT"),
    createInterest
);

router.get(
    "/",
    authMiddleware,
    authorize("OWNER"),
    getOwnerInterests
);

router.patch(
    "/:interestRequestId",
    authMiddleware,
    authorize("OWNER"),
    validate(updateInterestStatusSchema, "body"),
    updateInterestStatus
);

export default router;