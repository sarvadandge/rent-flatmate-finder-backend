import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
};