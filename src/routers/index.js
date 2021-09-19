const fs = require("fs");

/**
 * 动态注册路由
 * @param {*} app
 */
const useRouters = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (/\.router\.js$/.test(file)) {
      const router = require(`./${file}`);

      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  });
};

module.exports = useRouters;
