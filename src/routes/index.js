import express from "express";

import authRoutes from "./auth.routes.js";
import tenantProfileRoutes from "./tenantProfile.routes.js";
import listingRoutes from "./listing.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", tenantProfileRoutes);
router.use("/listings", listingRoutes);

export default router;