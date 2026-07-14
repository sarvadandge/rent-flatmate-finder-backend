import "dotenv/config";

import app from "./src/app.js";
import http from "http";
import { initializeSocket } from "./src/config/socket.js";
import { registerSocketHandlers } from "./src/sockets/index.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = initializeSocket(server);

registerSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});