import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { registerUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.validatedData);

  return res.status(201).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      result,
      "User registered successfully"
    )
  );
});