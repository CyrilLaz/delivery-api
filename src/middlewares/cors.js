const cors = require("cors");
const { CORS_ORIGIN } = require("../constants/connect-config");

module.exports.cors = cors({
  origin: CORS_ORIGIN,
  methods: "GET,PUT,POST,OPTIONS,HEAD,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type"],
});
