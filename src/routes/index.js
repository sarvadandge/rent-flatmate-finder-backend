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

router.get("/test-email", async (req, res) => {

  await sendEmail({
    to: "sarvad29@gmail.com",
    subject: "Test Email",
    html: "<h1>Hello from Rent & Flatmate Finder!</h1>",
  });

  res.json({
    success: true,
  });

});

export default router;