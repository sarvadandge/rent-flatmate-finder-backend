import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { listingSchema } from "../validators/listing.validator.js";

import { createRoomListing, getListingDetails, getMyListings, updateRoomListing } from "../controllers/listing.controller.js";

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

router.get(
    "/:listingId",
    authMiddleware,
    authorize("OWNER", "TENANT"),
    getListingDetails
);

router.put(
    "/:listingId",
    authMiddleware,
    authorize("OWNER"),
    validate(listingSchema),
    updateRoomListing
);

export default router;