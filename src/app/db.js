const mysql = require("mysql2");
const config = require("./config");

// 创建连接池
const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,

  charset: "utf8", //设置编码（省略在某些情况下会有错误）
  connectionLimit: 10, // 单次可创建最大连接数
});

// 测试连接
connection.getConnection((err1, conn) => {
  conn.connect((err2) => {
    if (err2) {
      console.log("数据库连接失败");
    } else {
      console.log("数据库连接成功");
    }
  });
});

module.exports = connection.promise();
