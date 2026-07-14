import express from "express";

import authRoutes from "./auth.routes.js";
import tenantProfileRoutes from "./tenantProfile.routes.js";
import listingRoutes from "./listing.routes.js";
import compatibilityRoutes from "./compatibility.routes.js";
import interestRoutes from "./interest.routes.js";
import chatRoutes from "./chat.routes.js";
import { sendEmail } from "../services/mail.service.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", tenantProfileRoutes);
router.use("/listings", listingRoutes);
router.use("/compatibility", compatibilityRoutes);
router.use("/interest", interestRoutes);
router.use("/chat", chatRoutes);

export default router;