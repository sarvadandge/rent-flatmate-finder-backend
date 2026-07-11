import express from "express";

import authRoutes from "./auth.routes.js";
import tenantProfileRoutes from "./tenantProfile.routes.js";
import listingRoutes from "./listing.routes.js";
import aiRoutes from "./ai.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", tenantProfileRoutes);
router.use("/listings", listingRoutes);
router.use("/ai", aiRoutes);

export default router;