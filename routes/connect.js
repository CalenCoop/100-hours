const express = require("express");
const router = express.Router();
const connectController = require("../controllers/connect")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, connectController.getConnect);
router.get("/:id", ensureAuth, connectController.getTopic);
router.post("/createTopic/", connectController.createTopic);
router.post("/createConnection/", connectController.createConnection);

module.exports = router;