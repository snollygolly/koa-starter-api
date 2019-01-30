const config = require("./config.json");

const app = require("./index.js").app;
const Router = require("koa-router");

const router = new Router();

const main = require("./controllers/main");

// routes

// heartbeat requires no token to view (see index.js)
router.get("/heartbeat", main.heartbeat);

// these routes require auth
router.get("/info", main.info);

app.use(router.routes());
app.use(router.allowedMethods());
