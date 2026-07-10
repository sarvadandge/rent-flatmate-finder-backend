import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    return res.status(statusCode).json(
        new ApiResponse(
            statusCode,
            err.errors || null,
            err.message
        )
    );
};

export default errorHandler;