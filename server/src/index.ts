import Koa from "koa";
import fs from "fs";
import { createServer } from "http";
import koaRouter from "koa-router";
import serve from "koa-static";
import mount from "koa-mount";
import cors from "@koa/cors";
import range from "koa-range";
import { createIo } from "./socket";
import path from "path";
import Timer from "./timer";

const VIDEO_DIR = "/home/zeko/src/synchan/videos";
const DURATION = 219;

const app = new Koa();

// app.use(async (ctx) => {
//   ctx.body = "Hello World";
// });

const router = new koaRouter();

router.get("/api/list", async (ctx) => {
  const files = await fs.promises.readdir(VIDEO_DIR);
  console.log(files);
  ctx.body = files;
});

const httpServer = createServer(app.callback());
const timer = new Timer(DURATION);
const io = createIo(httpServer, timer);
app.use(range);
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  mount(
    "/videos",
    serve(VIDEO_DIR, {
      setHeaders: (res, path, stats) => {
        res.setHeader("Content-Type", "video/mp4");
      },
    })
  )
);
app.use(router.routes());

httpServer.listen(3000);
