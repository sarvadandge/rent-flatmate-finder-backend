import { verifyChatAccess } from "../helper/chat.helper.js";
import { sendMessage } from "../services/chat.service.js";

export const registerChatEvents = (io, socket) => {
    socket.on("chat:join", async ({ chatRoomId }) => {
        console.log("chat:join received:", chatRoomId);

        try {
            await verifyChatAccess(chatRoomId, socket.user.id);

            socket.join(chatRoomId);

            socket.emit("chat:joined", {
                success: true,
                chatRoomId,
            });
        } catch (error) {
            console.error(error);

            socket.emit("chat:join_error", {
                message: error.message,
            });
        }
    });

    socket.on(
        "chat:send",
        async ({ chatRoomId, content }) => {

            try {

                const message =
                    await sendMessage(
                        chatRoomId,
                        socket.user.id,
                        content
                    );

                io.to(chatRoomId).emit(
                    "chat:message",
                    message
                );

            } catch (error) {

                socket.emit(
                    "chat:error",
                    {
                        message: error.message,
                    }
                );

            }

        }
    );
};