import Koa from "koa";
import { createServer } from "http";
import koaRouter from "koa-router";
import serve from "koa-static";
import mount from "koa-mount";
import cors from "@koa/cors";
import range from "koa-range";
import { createIo } from "./socket";

const app = new Koa();

// app.use(async (ctx) => {
//   ctx.body = "Hello World";
// });

const router = new koaRouter();
const httpServer = createServer(app.callback());
const io = createIo(httpServer);
app.use(range);
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  mount(
    "/videos",
    serve("../videos", {
      setHeaders: (res, path, stats) => {
        res.setHeader("Content-Type", "video/mp4");
      },
    })
  )
);

httpServer.listen(3000);
