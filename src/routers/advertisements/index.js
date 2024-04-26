const {
  getAdvs,
  getAdvById,
  createAdv,
} = require("../../controllers/advertisement");
const { upload } = require("../../middlewares/file");
const { protectRoute } = require("../../middlewares/protectRoute");

const router = require("express").Router();

router.get("/", getAdvs);
router.get("/:id", getAdvById);
router.post("/", protectRoute, upload.array("images"), createAdv);

module.exports.advRouter = router;
