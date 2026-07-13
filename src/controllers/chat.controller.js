import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { getChatRooms as getChatRoomsService } from "../services/chat.service.js";
import { getMessages as getMessagesService } from "../services/chat.service.js";
import { sendMessage as sendMessageService } from "../services/chat.service.js";

export const getChatRooms = asyncHandler(async (req, res) => {
    const chatRooms = await getChatRoomsService(req.user.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            chatRooms,
            "Chat rooms fetched successfully"
        )
    );
});

export const getMessages = asyncHandler(async (req, res) => {
    const messages = await getMessagesService(
        req.params.chatRoomId,
        req.user.id
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            messages,
            "Messages fetched successfully"
        )
    );
});

export const sendMessage = asyncHandler(async (req, res) => {
    const message = await sendMessageService(
        req.params.chatRoomId,
        req.user.id,
        req.validatedData.content
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            message,
            "Message sent successfully"
        )
    );
});