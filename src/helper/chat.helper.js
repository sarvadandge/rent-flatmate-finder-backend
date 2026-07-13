import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const verifyChatAccess = async (
    chatRoomId,
    userId
) => {
    const chatRoom = await prisma.chatRoom.findUnique({
        where: {
            id: chatRoomId,
        },
        include: {
            interestRequest: {
                include: {
                    tenant: true,
                    listing: true,
                },
            },
        },
    });

    if (!chatRoom) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Chat room not found"
        );
    }

    if (
        chatRoom.interestRequest.listing.ownerId !== userId &&
        chatRoom.interestRequest.tenant.userId !== userId
    ) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Unauthorized access"
        );
    }

    return chatRoom;
};