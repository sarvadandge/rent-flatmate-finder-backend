import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import { getChatRooms, getMessages, sendMessage } from "../controllers/chat.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { sendMessageSchema } from "../validators/chat.validator.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    getChatRooms
);

router.get(
    "/:chatRoomId/messages",
    authMiddleware,
    getMessages
);

router.post(
    "/:chatRoomId/messages",
    authMiddleware,
    validate(sendMessageSchema),
    sendMessage
);
export default router;