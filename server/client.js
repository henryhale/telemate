const numOfSockets = async (io, room) => (await io.in(room).fetchSockets()).length;

export default (io, socket) => {

    socket.on("room:join", async (room, user) => {
        socket.join(room);
        io.to(room).emit("member", room, user, await numOfSockets(io, room));
    });

    socket.on("room:message", (room, user, message) => {
        io.to(room).emit("message", room, user, message);
    });

    socket.on("room:leave", async (room, user) => {
        socket.leave(room);
        io.to(room).emit("leave", room, user, await numOfSockets(io, room));
    });

    socket.on("disconnect", () => {});

};