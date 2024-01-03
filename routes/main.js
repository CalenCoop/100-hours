const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const connectController = require("../controllers/connect")
const uploadController = require("../controllers/upload")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/profile/:id", ensureAuth, postsController.getProfile);
// router.post("/profile/:id/upload-profile-picture", ensureAuth, uploadController.uploadProfilePicture);
router.get("/home", ensureAuth, postsController.getHome);
router.get("/connect", ensureAuth, connectController.getConnect);


module.exports = router