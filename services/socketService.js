const { ObjectId } = require("mongodb");
const message = require("../models/message");
const { messageHandler } = require("../controllers/messageController");
const socket = (socket, io) => {
    console.log("SOCKET CONNECT ======>>>>>>>>>>>>>>")
    socket.emit('event', "Connection successfully");

    //CHAT

    socket.on('Join-Chat-Room', ({ roomId }) => {
        socket.join(roomId);
        io.in(roomId).emit("Room-Join-Status", `${roomId} this room join successfully`);
    })

    socket.on('Send-Message', async(req) => {
       const botMessage = await messageHandler(req)
        io.in(req.roomId).emit("New-Message", botMessage);
    })



    socket.on('disconnect', () => {
        console.log("SOCKET DISCONNECT ====>")
        socket.removeAllListeners();  // Clean up all event listeners
    });

}

module.exports = socket;
