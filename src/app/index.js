const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const userRouters = require("../routers/index");
const errorHandler = require("./error-handler");

const app = new Koa();

app.use(bodyParser());
userRouters(app);

app.on("error", errorHandler);

module.exports = app;
