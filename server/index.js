import { createServer } from "node:http";
import toobusy from "toobusy-js";
import helmet from "helmet";
import express from "express";
import { Server } from "socket.io";
import registerClientHandlers from "./client.js";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 8900;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.disable('x-powered-by');

app.use(helmet());

app.use(express.static("client/dist"));

app.use((req, res, next) => res.status(404).send(":( Not found!"));

app.use((req, res, next) => {
    if (toobusy()) {
        res.status(503).send(":( Server Too Busy!");
    } else {
        next();
    }
});

io.on("connection", (socket) => registerClientHandlers(io, socket));

server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
        console.error("Address in use, retrying...");
        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    }
});

server.listen(PORT, HOST, () => {
    console.log(HOST + ":" + PORT, ": Server is running...");
});
