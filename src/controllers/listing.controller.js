import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

import { createListing } from "../services/listing.service.js";

export const createRoomListing = asyncHandler(async (req, res) => {
    const listing = await createListing(
        req.user.id,
        req.validatedData
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            listing,
            "Room listing created successfully"
        )
    );
});