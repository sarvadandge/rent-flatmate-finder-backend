import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import { createInterest, getOwnerInterests } from "../controllers/interest.controller.js";

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

export default router;