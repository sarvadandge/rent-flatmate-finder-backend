import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import { HTTP_STATUS } from "../constants/http-status.constants.js";

import {
    generateCompatibilityForListing,
    generateCompatibilityForTenant,
} from "../services/compatibility.service.js";

export const generateForListing = asyncHandler(async (req, res) => {
    const result = await generateCompatibilityForListing(
        req.params.listingId
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            result,
            "Compatibility generated successfully"
        )
    );
});

export const generateForTenant = asyncHandler(async (req, res) => {
    const result = await generateCompatibilityForTenant(
        req.params.tenantId
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            result,
            "Compatibility generated successfully"
        )
    );
});