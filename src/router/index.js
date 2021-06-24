let Router = require("koa-router");
const { baseApi } = require("../../config");
const douyinCtr = require("../controllers/douyinCtr");

const router = new Router({
  prefix: `/${baseApi}`,
});
router.get("/douyin", douyinCtr).get("/test", (ctx, next) => {
  ctx.body = "OK";
  next();
});

exports = module.exports = (app) => {
  try {
    app.use(router.routes()).use(router.allowedMethods());
  } catch (error) {
    console.log(error);
  }
};
