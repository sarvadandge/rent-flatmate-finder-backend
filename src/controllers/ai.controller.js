import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { generateCompatibility } from "../services/ai.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const testAI = asyncHandler(async (req, res) => {

    const result = await generateCompatibility(
        req.body.tenant,
        req.body.listing
    );

    return res.json(
        new ApiResponse(
            HTTP_STATUS.OK,
            result,
            "AI response generated successfully"
        )
    );

});