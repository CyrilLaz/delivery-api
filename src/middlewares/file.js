const multer = require("multer");
const { UPLOAD_FOLDER } = require("../constants/connect-config");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const userId = req.user.id;
    cb(null, UPLOAD_FOLDER + "/" + userId);
  },
  // TODO : фикс ситуации с файлом с одним названием переписывает себя
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = { upload };
