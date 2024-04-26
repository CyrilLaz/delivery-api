const multer = require("multer");
const { UPLOAD_FOLDER } = require("../constants/connect-config");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // TODO: убрать хардкод
    const userId = "662b49c1c74e32bc0f9d2491";
    cb(null, UPLOAD_FOLDER + "/" + userId);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = { upload };
