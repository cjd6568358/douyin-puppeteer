let Router = require("koa-router");
const { baseApi } = require("../../config");
const douyinCtr = require("../controllers/douyinCtr");

const router = new Router({
  prefix: `/${baseApi}`,
});
router.get("/douyin", douyinCtr);

exports = module.exports = (app) => {
  try {
    app.use(router.routes()).use(router.allowedMethods());
  } catch (error) {
    console.log(error);
  }
};
