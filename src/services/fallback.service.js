export const calculateFallbackScore = (tenant, listing) => {
    let score = 0;

    if (
        tenant.preferredLocation?.trim().toLowerCase() ===
        listing.location?.trim().toLowerCase()
    ) {
        score += 40;
    }

    if (
        listing.rent >= tenant.minBudget &&
        listing.rent <= tenant.maxBudget
    ) {
        score += 40;
    }

    const tenantDate = new Date(tenant.moveInDate);
    const listingDate = new Date(listing.availableFrom);

    const diffInDays = Math.abs(
        (listingDate - tenantDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays <= 15) {
        score += 20;
    }

    return {
        score,
        explanation: "Generated using rule-based fallback",
        generatedBy: "FALLBACK",
    };
};