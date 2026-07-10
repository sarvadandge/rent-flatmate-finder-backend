import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { registerUser } from "../services/auth.service.js";
import { getCurrentUser as getCurrentUserService } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.validatedData);

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(
      HTTP_STATUS.CREATED,
      result,
      "User registered successfully"
    )
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await getCurrentUserService(req.user.id);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      user,
      "Current user fetched successfully"
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.validatedData);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      result,
      "Login successful"
    )
  );
});