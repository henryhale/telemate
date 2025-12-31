import "./theme/styles.css";

import io from "socket.io-client";
import hash from "./src/hash";
import { openChannelWindow, onConnectHanndler, sanitizeData } from "./src/index";

window.addEventListener("DOMContentLoaded", () => {
    const socket = io({
        transports: ["websocket", "polling"]
    });

    socket.on("connect_error", () => {
        socket.io.opts.transports = ["polling", "websocket"];
    });

    socket.on("connect", () => onConnectHanndler(socket));

    document
        .querySelector("form")
        .addEventListener("submit", (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            document.querySelector("summary").click();
            
            const data = new FormData(ev.target, ev.submitter);

            ev.target[0].value = "";
            ev.target[1].value = "";

            const { room, code, user } = { 
                room: sanitizeData(data.get("room") || ""),
                code: sanitizeData(data.get("code") || ""),
                user: sanitizeData(data.get("user") || "Anonymous"),
            };

            if (!room || !code) return false;

            openChannelWindow(socket, hash(room, code), hash(code, room), "TM-" + room, user);

            return true;
        });
    
    const tid = setInterval(() => {
        const slot = document.querySelector('#time');
        if (!slot) clearInterval(tid);
        const date = new Date();
        slot.innerHTML = date.toLocaleTimeString();
    }, 1000);

    window.addEventListener('beforeunload', () => {
        clearInterval(tid);
    });
});

