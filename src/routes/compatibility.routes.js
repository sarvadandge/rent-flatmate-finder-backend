import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import { generateForListing, generateForTenant } from "../controllers/compatibility.controller.js";

const router = express.Router();

router.post(
    "/listing/:listingId",
    authMiddleware,
    authorize("OWNER"),
    generateForListing
);

router.post(
    "/tenant/:tenantId",
    authMiddleware,
    authorize("TENANT"),
    generateForTenant
);
export default router;