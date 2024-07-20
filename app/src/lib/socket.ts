import { io } from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("connected to socket");
});

export function play() {
  socket.emit("play");
}

export function pause() {
  socket.emit("pause");
}

export function seek(time: number) {
  socket.emit("seek", time);
}

export function bindReceiveTime(
  handler: (play: boolean, time: number) => void
) {
  socket.on("control", handler);
}

export default socket;
