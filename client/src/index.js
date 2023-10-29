import { createWinbox } from "./winbox";
import { createTerminal } from "./cli";

const state = new Map();

export function openChannelWindow(socket, room, title, user) {
    
    if (state.has(room)) {
        state.get(room).win.minimize(false).focus();
        return;
    }

    const target = document.createElement("div");
    const win = createWinbox({ target, title });
    const term = createTerminal(target);

    win.onclose = (flag) => {
        if (!flag) {
            socket.emit("room:leave", room, user);
            state.delete(room);
        }
        term.dispose();
    };

    win.onfocus = () => term.focus();

    const manual = 
        "<span class='intro'>\nWelcome to TeleMate!\n\n</span>" +
        "<span class='center'>" + 
            "<span class='highlight'>:clear</span> to clear chats\n" + 
            "<span class='highlight'>:exit</span> to exit chat session\n" + 
            "<span class='highlight'>:help</span> to display commands" + 
        "</span>";

    term.writeln(manual);

    term.write("<span class=spinner></span> Connecting...");

    term.on("data", (input) => {
        term.clearLast();
        if (!input.length) return;
        if (/:[a-z]+/g.test(input))
        {
            switch (input) {
                case ":clear":
                    term.clear();
                    break;

                case ":exit":
                    win.close();
                    break;

                case ":help":
                    term.writeln(manual);
                    break;
            
                default:
                    break;
            }
            return;
        }
        socket.emit("room:message", room, user, input);
    });

    if (socket.connected) {
        state.set(room, { title, term, win, user });
    
        socket.emit("room:join", room, user);

        socket.once("disconnect", () => win.close());

        term.clearLast();
        term.resume();
        
        win.minimize(false).focus();
        
    } else {
        win.close(true);
    }

}

export function onConnectHanndler(socket) {
    socket.on("member", (room, user, num) => {
        const s = state.get(room);
        if (s) {
            s.term.write(`<span class=notification>${user} has joined</span>`);
            s.win.setTitle(`${s.title} [${num || 0}]`);
        }
    });

    socket.on("message", (room, user, message) => {
        state.get(room)?.term.write(`<fieldset><legend>[ <span>${user}</span> ]</legend>${message}</fieldset>`);
    });

    socket.on("leave", (room, user, num) => {
        const s = state.get(room);
        if (s) {
            s.term.writeln(`<span class=notification>${user} disconnected`);
            s.win.setTitle(`${s.title} [${num || 0}]`);
        }
    });
}