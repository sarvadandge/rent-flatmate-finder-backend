import express from "express";

import authRoutes from "./auth.routes.js";
import tenantProfileRoutes from "./tenantProfile.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", tenantProfileRoutes);

export default router;