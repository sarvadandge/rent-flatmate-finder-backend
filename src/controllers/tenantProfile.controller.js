import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

import { createTenantProfile } from "../services/tenantProfile.service.js";
import { getTenantProfile } from "../services/tenantProfile.service.js";

export const createProfile = asyncHandler(async (req, res) => {
  const profile = await createTenantProfile(
    req.user.id,
    req.validatedData
  );

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      profile,
      "Tenant profile created successfully"
    )
  );
});

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await getTenantProfile(req.user.id);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      profile,
      "Tenant profile fetched successfully"
    )
  );
});