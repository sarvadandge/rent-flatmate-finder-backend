import prisma from "../config/prisma.js";
import { HTTP_STATUS } from "../constants/http-status.constants.js";
import ApiError from "../utils/ApiError.js";
import { generateCompatibility } from "./ai.service.js";

async function saveCompatibility(
    tenant,
    listing
) {
    const compatibility = await generateCompatibility(
        tenant,
        listing
    );

    return prisma.compatibilityScore.upsert({
        // shared upsert logic
        where: {
            tenantId_listingId: {
                tenantId: tenant.id,
                listingId: listing.id
            }
        },

        update: {
            score: compatibility.score,
            explanation: compatibility.explanation,
            generatedBy: compatibility.generatedBy
        },

        create: {
            tenantId: tenant.id,
            listingId: listing.id,
            score: compatibility.score,
            explanation: compatibility.explanation,
            generatedBy: compatibility.generatedBy
        }
    });
}

export const generateCompatibilityForListing = async (
    listingId
) => {
    const listing = await prisma.roomListing.findUnique({
        where: {
            id: listingId
        }
    });

    if (!listing) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Listing not found"
        );
    }

    const tenants = await prisma.tenantProfile.findMany();

    const tasks = tenants.map(async (tenant) => {
        saveCompatibility(tenant, listing)
    });

    await Promise.all(tasks);

    return {
        listingId,
        totalTenants: tenants.length,
    };
};

export const generateCompatibilityForTenant = async (
    tenantId
) => {
    const tenant = await prisma.tenantProfile.findUnique({
        where: {
            id: tenantId,
        },
    });

    if (!tenant) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Tenant profile not found"
        );
    }

    const listings = await prisma.roomListing.findMany({
        where: {
            isFilled: false,
        },
    });

    const tasks = listings.map(async (listing) => {
        saveCompatibility(tenant, listing)
    });

    await Promise.all(tasks);

    return {
        tenantId,
        totalListings: listings.length,
    };
};