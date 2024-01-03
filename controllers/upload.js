const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
     uploadProfilePicture: async (req, res) => {
        try {
          if (req.file){
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
      
          // Update user's profile picture in the database
          await User.findByIdAndUpdate(req.user.id, { 
            profilePicture: result.secure_url,
            cloudinaryId: result.public_id, });
          } else{ 
                console.log("error_msg", "Please upload a valid image file");
                return res.redirect("/profile/" + req.user.id); 
          }
          console.log("success_msg", "Profile picture updated successfully.");
          return res.redirect("/profile/" + req.user.id);
        } catch (error) {
          console.log(error);
          console.log("error_msg", "An error has occurred while updating your profile picture");
          return res.redirect("/profile/" + req.user.id);
        }
      },
      uploadBackgroundPicture: async (req, res) => {
        try {
          if (req.file){
          // Upload image to cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
      
          // Update user's profile picture in the database
          await User.findByIdAndUpdate(req.user.id, { 
            profileBackground: result.secure_url,
            });
          } else{ 
                console.log("error_msg", "Please upload a valid image file");
                return res.redirect("/profile/" + req.user.id); 
          }
          console.log("success_msg", "Profile picture updated successfully.");
          return res.redirect("/profile/" + req.user.id);
        } catch (error) {
          console.log(error);
          console.log("error_msg", "An error has occurred while updating your profile picture");
          return res.redirect("/profile/" + req.user.id);
        }
      },
};