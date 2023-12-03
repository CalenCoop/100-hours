const express = require("express");
const router = express.Router();
const connectController = require("../controllers/connect")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/:id", ensureAuth, connectController.getConnect);
router.post("/createConnection/", connectController.createConnection);

module.exports = router;