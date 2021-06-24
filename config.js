const { getProcessEnv } = require("./src/util/index");
const SERVER_PORT = getProcessEnv("PORT") || 3030;
const PLATOM = getProcessEnv("PLATOM");
const NODE_ENV = getProcessEnv("NODE_ENV") || "development";
const baseApi = "api";

exports = module.exports = {
  SERVER_PORT,
  NODE_ENV,
  PLATOM,
  baseApi,
};
