const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.post("/profilePicture/:id", ensureAuth, upload.single("file"), uploadController.uploadProfilePicture);
router.post("/profileBackground/:id", ensureAuth, upload.single("file"), uploadController.uploadBackgroundPicture);

module.exports = router;