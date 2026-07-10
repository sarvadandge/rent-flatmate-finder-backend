import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { listingSchema } from "../validators/listing.validator.js";

import { createRoomListing, getMyListings } from "../controllers/listing.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    authorize("OWNER"),
    validate(listingSchema),
    createRoomListing
);

router.get(
    "/my-listings",
    authMiddleware,
    authorize("OWNER"),
    getMyListings
);

export default router;