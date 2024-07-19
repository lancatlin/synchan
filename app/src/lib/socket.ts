import { io } from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("connected to socket");
});

export function play() {
  socket.emit("play");
}

export default socket;
