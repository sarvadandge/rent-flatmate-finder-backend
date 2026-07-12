import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { createInterestRequest } from "../services/interest.service.js";

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