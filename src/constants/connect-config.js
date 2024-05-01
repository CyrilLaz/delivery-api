module.exports.PORT = process.env.PORT || 3000;
module.exports.SESSION_SECRET = process.env.SESSION_SECRET || "secret";
module.exports.MONGO_URL =
  process.env.MONGO_URL || "mongodb://mongodb/delivery";
module.exports.UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || "data/";
module.exports.CORS_ORIGIN = process.env.CORS_ORIGIN || [
  "http://localhost:5500",
  "http://localhost:5501",
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5501",
];
