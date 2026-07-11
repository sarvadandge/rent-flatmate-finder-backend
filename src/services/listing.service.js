import cloudinary from "../config/cloudinary.js";
import prisma from "../config/prisma.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

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

export const updateListing = async (
    listingId,
    ownerId,
    listingData
) => {
    await findOwnerListing(listingId, ownerId);

    return prisma.roomListing.update({
        where: {
            id: listingId,
        },
        data: listingData,
    });
};

export const deleteListing = async (
    listingId,
    ownerId
) => {
    await findOwnerListing(listingId, ownerId);

    await prisma.roomListing.delete({
        where: {
            id: listingId,
        },
    });
};

const findOwnerListing = async (listingId, ownerId) => {
    const listing = await prisma.roomListing.findUnique({
        where: { id: listingId },
    });

    if (!listing) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Listing not found"
        );
    }

    if (listing.ownerId !== ownerId) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "You are not allowed to access this listing"
        );
    }

    return listing;
};

export const markListingAsFilled = async (
    listingId,
    ownerId
) => {
    const listing = await findOwnerListing(
        listingId,
        ownerId
    );

    if (listing.isFilled) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Listing is already marked as filled"
        );
    }

    return prisma.roomListing.update({
        where: {
            id: listingId,
        },
        data: {
            isFilled: true,
        },
    });
};

export const uploadListingImages = async (
    listingId,
    ownerId,
    files
) => {
    await findOwnerListing(listingId, ownerId);

    const existingImages = await prisma.listingImage.count({
        where: {
            listingId,
        },
    });

    if (existingImages + files.length > 5) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            "A listing can have a maximum of 5 images"
        );
    }

    const uploads = files.map((file) =>
        uploadToCloudinary(file.buffer)
    );

    let uploadedFiles = [];

    try {
        uploadedFiles = await Promise.all(uploads);
    } catch (error) {
        await Promise.all(
            uploadedFiles.map(file =>
                cloudinary.uploader.destroy(file.public_id)
            )
        );

        throw error;
    }

    return prisma.listingImage.createManyAndReturn({
        data: uploadedImages,
    });
};

export const deleteListingImage = async (
    imageId,
    ownerId
) => {
    const image = await prisma.listingImage.findUnique({
        where: {
            id: imageId
        },
        include: {
            listing: true
        }
    });

    if (!image) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Image not found"
        );
    }

    if (image.listing.ownerId !== ownerId) {
        throw new ApiError(
            HTTP_STATUS.FORBIDDEN,
            "You are not allowed to perform this action"
        );
    }

    await cloudinary.uploader.destroy(
        image.publicId
    );

    await prisma.listingImage.delete({
        where: {
            id: imageId
        }
    });

}