const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");



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
    getHome: async (req, res) => {
        try {
          const posts = await Post.find().sort({ createdAt: "desc" }).lean();
          res.render("home.ejs", { posts: posts, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      getDiscover: async (req, res) => {
        try {
          const posts = await Post.find().sort({ createdAt: "desc" }).lean();
          res.render("discover.ejs", { posts: posts, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      getPost: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          const comments = await Comment.find({post: req.params.id}).sort({createdAt: 'desc'}).lean();
          const user = await User.findById(post.user)
          res.render("post.ejs", { post: post, user: req.user, comments: comments, postUsername: user.userName });
        } catch (err) {
          console.log(err);
        }
      },
      createPost: async (req, res) => {
        try {
          // Upload image to cloudinary
          let newPost;
      
          if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
      
            newPost = await Post.create({
              comment: req.body.comment,
              image: result.secure_url,
              cloudinaryId: result.public_id,
              caption: req.body.caption,
              likes: 0,
              user: req.user.id,
            });
          } else {
            newPost = await Post.create({
              comment: req.body.comment,
              likes: 0,
              user: req.user.id,
            });
          }
      
          console.log("Post has been added!");
          res.redirect("/post/" + newPost._id);
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
      },
}