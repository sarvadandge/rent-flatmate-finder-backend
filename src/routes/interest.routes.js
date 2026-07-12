import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import { createInterest } from "../controllers/interest.controller.js";

const router = express.Router();

router.post(
    "/:listingId",
    authMiddleware,
    authorize("TENANT"),
    createInterest
);

export default router;