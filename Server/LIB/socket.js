import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  },
});

export function getRecieverSocketId(userId){
    return userSockerMap[userId];
}
//store online users
const userSockerMap={};

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        userSockerMap[userId]=socket.id;
    }
    //io.emit will send to all connected users
    io.emit("onlineUsers",Object.keys(userSockerMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSockerMap[userId];
        io.emit("onlineUsers",Object.keys(userSockerMap));
    });
});

export {io,app,server};