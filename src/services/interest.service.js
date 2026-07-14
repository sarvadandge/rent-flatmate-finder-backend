import prisma from "../config/prisma.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";
import { getListingById } from "./listing.service.js";
import { InterestStatus } from "@prisma/client";
import {
    sendInterestCreatedEmail,
    sendInterestAcceptedEmail,
    sendInterestDeclinedEmail,
} from "./mail.service.js";

export const createInterestRequest = async (
    tenantUserId,
    listingId
) => {
    const tenant = await prisma.tenantProfile.findUnique({
        where: {
            userId: tenantUserId,
        },
        include: {
            user: true,
        },
    });

    if (!tenant) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Tenant profile not found"
        );
    }

    const listing = await getListingById(listingId);

    if (listing.isFilled) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Listing is already filled"
        );
    }

    if (listing.ownerId === tenantUserId) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "You cannot express interest in your own listing"
        );
    }

    const existingInterest = await prisma.interestRequest.findUnique({
        where: {
            tenantId_listingId: {
                tenantId: tenant.id,
                listingId,
            },
        },
    });

    if (existingInterest) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Interest request already exists"
        );
    }

    const interestRequest = await prisma.interestRequest.create({
        data: {
            tenantId: tenant.id,
            listingId,
        },
    });

    try {
        await sendInterestCreatedEmail({
            ownerName: listing.owner.name,
            ownerMail: listing.owner.email,
            tenantName: tenant.user.name,
            listingTitle: listing.title,
        });
    } catch (error) {
        console.error("Error sending interest created email:", error);
    }

    return interestRequest;
};

export const getOwnerInterestRequests = async (ownerId) => {
    const requests = await prisma.interestRequest.findMany({
        where: {
            listing: {
                ownerId,
            },
        },
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
                    compatibilityScores: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return requests.map((request) => ({
        ...request,
        compatibility:
            request.listing.compatibilityScores.find(
                (score) => score.tenantId === request.tenantId
            ) ?? null,
        listing: {
            ...request.listing,
            compatibilityScores: undefined,
        },
    }));
};

export const updateInterestStatus = async (
    ownerId,
    interestRequestId,
    status
) => {
    const interestRequest = await prisma.interestRequest.findUnique({
        where: {
            id: interestRequestId,
        },
        include: {
            listing: true,
            tenant: {
                include: {
                    user: true,
                },
            },
        },
    });

    if (!interestRequest) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Interest request not found"
        );
    }

    if (interestRequest.listing.ownerId !== ownerId) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "Unauthorized"
        );
    }

    if (interestRequest.status !== InterestStatus.PENDING) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Interest request has already been processed"
        );
    }

    if (status === InterestStatus.DECLINED) {
        const updatedRequest = await prisma.interestRequest.update({
            where: {
                id: interestRequest.id,
            },
            data: {
                status: InterestStatus.DECLINED,
            },
        });

        try {
            await sendInterestDeclinedEmail({
                tenantName: interestRequest.tenant.user.name,
                tenantMail: interestRequest.tenant.user.email,
                listingTitle: interestRequest.listing.title,
            });
        } catch (error) {
            console.error("Error sending interest declined email:", error);
        }

        return updatedRequest;
    }

    const result = await prisma.$transaction(async (tx) => {
        await tx.interestRequest.update({
            where: {
                id: interestRequest.id,
            },
            data: {
                status: InterestStatus.ACCEPTED,
            },
        });

        await tx.roomListing.update({
            where: {
                id: interestRequest.listingId,
            },
            data: {
                isFilled: true,
            },
        });

        const declinedRequests = await tx.interestRequest.findMany({
            where: {
                listingId: interestRequest.listingId,
                status: InterestStatus.PENDING,
                id: {
                    not: interestRequest.id,
                },
            },
            include: {
                tenant: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        await tx.interestRequest.updateMany({
            where: {
                listingId: interestRequest.listingId,
                status: InterestStatus.PENDING,
                id: {
                    not: interestRequest.id,
                },
            },
            data: {
                status: InterestStatus.DECLINED,
            },
        });

        const chatRoom = await tx.chatRoom.create({
            data: {
                interestRequestId: interestRequest.id,
            },
        });

        return {
            chatRoom,
            declinedRequests,
        };
    });

    try {
        await sendInterestAcceptedEmail({
            tenantName: interestRequest.tenant.user.name,
            tenantMail: interestRequest.tenant.user.email,
            listingTitle: interestRequest.listing.title,
        });
    } catch (error) {
        console.error(
            `Failed to send accepted email to ${interestRequest.tenant.user.email}`,
            error
        );
    }

    await Promise.all(
        result.declinedRequests.map(async (request) => {
            try {
                await sendInterestDeclinedEmail({
                    tenantName: request.tenant.user.name,
                    tenantMail: request.tenant.user.email,
                    listingTitle: interestRequest.listing.title,
                });
            } catch (error) {
                console.error(
                    `Failed to send decline email to ${request.tenant.user.email}`,
                    error
                );
            }
        })
    );

    return result.chatRoom;
};