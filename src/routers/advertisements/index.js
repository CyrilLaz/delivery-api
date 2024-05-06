const {
  getAdvs,
  getAdvById,
  createAdv,
  deleteAdv,
  getAdvByParams,
} = require("../../controllers/advertisement");
const { upload } = require("../../middlewares/file");
const { protectRoute } = require("../../middlewares/protectRoute");

const router = require("express").Router();

router.get("/", getAdvs);
router.get("/:id", getAdvById);
router.delete("/:id", protectRoute, deleteAdv);
router.post("/", protectRoute, upload.array("images"), createAdv);

module.exports.advRouter = router;
