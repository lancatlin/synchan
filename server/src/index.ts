import Koa from "koa";
import koaRouter from "koa-router";
import serve from "koa-static";
import mount from "koa-mount";
import cors from "@koa/cors";
import range from "koa-range";

const app = new Koa();

// app.use(async (ctx) => {
//   ctx.body = "Hello World";
// });

const router = new koaRouter();

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

app.listen(3000);
