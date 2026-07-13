import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { createInterestRequest, getOwnerInterestRequests, updateInterestStatus as updateInterestStatusService } from "../services/interest.service.js";

export const createInterest = asyncHandler(async (req, res) => {
    const interestRequest = await createInterestRequest(
        req.user.id,
        req.params.listingId
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            interestRequest,
            "Interest request created successfully"
        )
    );
});

export const getOwnerInterests = asyncHandler(async (req, res) => {
    const requests = await getOwnerInterestRequests(req.user.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            requests,
            "Interest requests fetched successfully"
        )
    );
});

export const updateInterestStatus = asyncHandler(async (req, res) => {
    const { interestRequestId } = req.params;
    const ownerId = req.user.id;
    const { status } = req.body;

    const updatedRequest = await updateInterestStatusService(
        ownerId,
        interestRequestId,
        status
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            updatedRequest,
            "Interest request status updated successfully"
        )
    );
});