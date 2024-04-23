const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, MONGO_URL } = require("./constants/connect-config");
const { rootRouter } = require("./routers");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", rootRouter);
app.use(errorHandler);

(async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Запущено прилолжение на ${PORT}`);
    });
  } catch (error) {
    throw error;
  }
})();
