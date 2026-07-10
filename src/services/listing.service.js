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
