import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import { verifyChatAccess } from "../helper/chat.helper.js";

export const getChatRooms = async (userId) => {
    const chatRooms = await prisma.chatRoom.findMany({
        where: {
            OR: [
                {
                    interestRequest: {
                        listing: {
                            ownerId: userId,
                        },
                    },
                },
                {
                    interestRequest: {
                        tenant: {
                            userId,
                        },
                    },
                },
            ],
        },

        include: {
            interestRequest: {
                include: {
                    tenant: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },

                    listing: {
                        include: {
                            owner: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedChatRooms = chatRooms.map(room => {

        const isOwner =
            room.interestRequest.listing.owner.id === userId;

        return {

            chatRoomId: room.id,

            createdAt: room.createdAt,

            listing: {
                id: room.interestRequest.listing.id,
                title: room.interestRequest.listing.title,
            },

            otherUser: isOwner
                ? room.interestRequest.tenant.user
                : room.interestRequest.listing.owner,

        };

    });

    return formattedChatRooms;
}

export const getMessages = async (
    chatRoomId,
    userId
) => {

    await verifyChatAccess(
        chatRoomId,
        userId
    );

    return prisma.message.findMany({
        where: {
            chatRoomId,
        },

        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },

        orderBy: {
            createdAt: "asc",
        },
    });
}

export const sendMessage = async (
    chatRoomId,
    senderId,
    content
) => {

    await verifyChatAccess(
        chatRoomId,
        senderId
    );

    const message = await prisma.message.create({
        data: {
            chatRoomId,
            senderId,
            content,
        },
        include: {
            sender: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return message;
}