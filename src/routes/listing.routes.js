import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import upload from "../middleware/upload.middleware.js";

import { listingSchema } from "../validators/listing.validator.js";

import {
    createRoomListing,
    deleteRoomListing,
    getListingDetails,
    getMyListings,
    updateRoomListing,
    markFilled,
    uploadImages,
    deleteImage
} from "../controllers/listing.controller.js";

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

router.delete(
    "/:listingId",
    authMiddleware,
    authorize("OWNER"),
    deleteRoomListing
);

router.patch(
    "/:listingId/fill",
    authMiddleware,
    authorize("OWNER"),
    markFilled
);

router.post(
    "/:listingId/images",
    authMiddleware,
    authorize("OWNER"),
    upload.array("images", 5),
    uploadImages
);

router.delete(
    "/images/:imageId",
    authMiddleware,
    authorize("OWNER"),
    deleteImage
);

export default router;