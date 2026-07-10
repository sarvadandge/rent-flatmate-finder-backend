import prisma from "../config/prisma.js";

export const createListing = async (ownerId, listingData) => {
    const listing = await prisma.roomListing.create({
        data: {
            ...listingData,
            ownerId,
        },
    });

    return listing;
};

export const getOwnerListings = async (ownerId) => {
    return prisma.roomListing.findMany({
        where: {
            ownerId,
        },
        include: {
            images: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getListingById = async (listingId) => {
    const listing = await prisma.roomListing.findUnique({
        where: {
            id: listingId,
        },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            images: true,
        },
    });

    if (!listing) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Listing not found"
        );
    }

    return listing;
};