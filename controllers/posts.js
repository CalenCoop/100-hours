const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");



module.exports = {
    getProfile: async (req, res) => {
      try {
        const posts = await Post.find({ user: req.params.id});
        const profile = await User.findById(req.params.id)
        res.render("profile.ejs", { posts: posts, user: req.user, profile: profile });
      } catch (err) {
        console.log(err);
      }
    },
}