const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const JWT_PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const JWT_PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);

module.exports = {
  APP_HOST,
  APP_PORT,

  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports.JWT_PRIVATE_KEY = JWT_PRIVATE_KEY;
module.exports.JWT_PUBLIC_KEY = JWT_PUBLIC_KEY;
