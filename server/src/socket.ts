import { Server as IoServer } from "socket.io";

import { Server as HttpServer } from "http";
import Timer from "./timer";

export function createIo(httpServer: HttpServer, timer: Timer) {
  const io = new IoServer(httpServer, {
    // TODO: handle CORS properly
    cors: {
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("play", () => {
      console.log("play");
      timer.play();
    });

    socket.on("pause", () => {
      console.log("pause");
      timer.pause();
    });

    socket.on("seek", (time: number) => {
      console.log("seek", time);
      timer.seek(time);
    });

    const callback = (playing: boolean, time: number) => {
      socket.emit("control", playing, time);
    };

    timer.addCallback(callback);
    socket.on("disconnect", () => {
      console.log("a user disconnected");
      timer.removeCallback(callback);
    });
  });

  return io;
}
