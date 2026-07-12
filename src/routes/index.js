import express from "express";

import authRoutes from "./auth.routes.js";
import tenantProfileRoutes from "./tenantProfile.routes.js";
import listingRoutes from "./listing.routes.js";
import aiRoutes from "./ai.routes.js";
import compatibilityRoutes from "./compatibility.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", tenantProfileRoutes);
router.use("/listings", listingRoutes);
router.use("/ai", aiRoutes);
router.use("/compatibility", compatibilityRoutes);

export default router;