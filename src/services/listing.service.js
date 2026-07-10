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