import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";

export const createTenantProfile = async (userId, profileData) => {
    // Check if profile already exists
    const existingProfile = await prisma.tenantProfile.findUnique({
        where: {
            userId,
        },
    });

    if (existingProfile) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Tenant profile already exists"
        );
    }

    // Create profile
    const profile = await prisma.tenantProfile.create({
        data: {
            ...profileData,
            userId,
        },
    });

    return profile;
};

export const getTenantProfile = async (userId) => {
    const profile = await prisma.tenantProfile.findUnique({
        where: {
            userId,
        },
    });

    if (!profile) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Tenant profile not found"
        );
    }

    return profile;
};