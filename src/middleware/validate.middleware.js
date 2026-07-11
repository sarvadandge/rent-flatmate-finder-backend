import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const validate = (schema, source = "body") => {
  return async (req, res, next) => {
    try {
      req.validatedData = await schema.parseAsync(req[source]);

      next();
    } catch (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        new ApiResponse(
          HTTP_STATUS.BAD_REQUEST,
          error.issues,
          "Validation failed"
        )
      );
    }
  };
};