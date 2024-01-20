const Comment = require("../models/Comment");

module.exports = {
createComment: async (req, res) => {
    try {
      const commentData = {
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        parentComment: req.body.parentCommentId, 
        createdBy: req.user.userName,
        createdById: req.user.id,
      };
      if (req.body.parentCommentId) {
        // Update parent comment with the new reply
        const parentComment = await Comment.findById(req.body.parentCommentId);
        if (parentComment) {
          const newReply = await Comment.create(commentData);
          parentComment.replies.push(newReply._id);
          await parentComment.save();
        } else{
          console.log('Parent comment not found');
        }
      } else{
        //create new comment
        await Comment.create(commentData)
      }
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res)=> {
    try {
        await Comment.deleteOne({_id: req.params.commentid})
        res.redirect("/post/"+req.params.postid)
    } catch(err){
        console.log(err)
    }
  }
};
