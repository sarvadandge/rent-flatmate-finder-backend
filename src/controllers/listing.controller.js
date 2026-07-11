import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

import { createListing } from "../services/listing.service.js";
import { getOwnerListings } from "../services/listing.service.js";
import { getListingById } from "../services/listing.service.js";
import { updateListing } from "../services/listing.service.js";
import { deleteListing } from "../services/listing.service.js";
import { markListingAsFilled } from "../services/listing.service.js";
import { uploadListingImages } from "../services/listing.service.js";
import { deleteListingImage } from "../services/listing.service.js";
import { browseListings as browseListingsService } from "../services/listing.service.js";

export const createRoomListing = asyncHandler(async (req, res) => {
    const listing = await createListing(
        req.user.id,
        req.validatedData
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            listing,
            "Room listing created successfully"
        )
    );
});

export const getMyListings = asyncHandler(async (req, res) => {
    const listings = await getOwnerListings(req.user.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            listings,
            "Owner listings fetched successfully"
        )
    );
});

export const getListingDetails = asyncHandler(async (req, res) => {
    const listing = await getListingById(
        req.params.listingId
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            listing,
            "Listing fetched successfully"
        )
    );
});

export const updateRoomListing = asyncHandler(async (req, res) => {
    const listing = await updateListing(
        req.params.listingId,
        req.user.id,
        req.validatedData
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            listing,
            "Listing updated successfully"
        )
    );
});

export const deleteRoomListing = asyncHandler(async (req, res) => {
    await deleteListing(
        req.params.listingId,
        req.user.id
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            null,
            "Listing deleted successfully"
        )
    );
});

export const markFilled = asyncHandler(async (req, res) => {
    const listing = await markListingAsFilled(
        req.params.listingId,
        req.user.id
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            listing,
            "Listing marked as filled successfully"
        )
    );
});

export const uploadImages = asyncHandler(async (req, res) => {
    const images = await uploadListingImages(
        req.params.listingId,
        req.user.id,
        req.files
    );

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
            HTTP_STATUS.CREATED,
            images,
            "Images uploaded successfully"
        )
    );
});

export const deleteImage = asyncHandler(async (req, res) => {

    await deleteListingImage(
        req.params.imageId,
        req.user.id
    );

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            null,
            "Image deleted successfully"
        )
    );

});

export const browseListings = asyncHandler(async (req, res) => {
    const {
        page,
        limit,
        location,
        minBudget,
        maxBudget,
    } = req.validatedData;

    const result = await browseListingsService(page, limit, location, minBudget, maxBudget);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            result,
            "Listings fetched successfully"
        )
    );
});