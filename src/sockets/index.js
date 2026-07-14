import { socketAuth } from "./auth.socket.js";
import { registerChatEvents } from "./chat.socket.js";

export const registerSocketHandlers = (io) => {
    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log(`${socket.user.email} connected`);

        registerChatEvents(io, socket);

        socket.on("disconnect", () => {
            console.log(
                `${socket.user.email} disconnected`
            );
        });
    });
};