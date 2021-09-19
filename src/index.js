const app = require("./app/index");
const { APP_PORT } = require("./app/config");

require("./app/db");

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功：http://localhost:${APP_PORT}`);
});
