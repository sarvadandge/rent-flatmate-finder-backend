import prisma from "../config/prisma.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";
import { getListingById } from "./listing.service.js";

export const createInterestRequest = async (
    tenantUserId,
    listingId
) => {
    // Find tenant profile
    const tenant = await prisma.tenantProfile.findUnique({
        where: {
            userId: tenantUserId,
        },
    });

    if (!tenant) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Tenant profile not found"
        );
    }

    // Reuse existing listing service
    const listing = await getListingById(listingId);

    // Listing already filled
    if (listing.isFilled) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "Listing is already filled"
        );
    }

    // Prevent owner from expressing interest
    if (listing.ownerId === tenantUserId) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "You cannot express interest in your own listing"
        );
    }

    // Prevent duplicate requests
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

    // Create interest request
    return prisma.interestRequest.create({
        data: {
            tenantId: tenant.id,
            listingId,
        },
    });
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

    const compatibilityScores = await prisma.compatibilityScore.findMany({
        where: {
            OR: requests.map((request) => ({
                tenantId: request.tenantId,
                listingId: request.listingId,
            })),
        },
    });

    const formattedRequests = requests.map((request) => ({
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

    return formattedRequests;
};