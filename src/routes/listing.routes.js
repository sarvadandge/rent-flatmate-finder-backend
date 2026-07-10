import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { listingSchema } from "../validators/listing.validator.js";

import { createRoomListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("OWNER"),
    validate(listingSchema),
    createRoomListing
);

export default router;