import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          "Authentication required"
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          "You are not authorized to perform this action"
        )
      );
    }

    next();
  };
};

export default authorize;