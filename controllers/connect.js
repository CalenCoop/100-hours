const Topic = require('../models/Topic')
const Connect= require("../models/Connect");


module.exports = {
    getConnect: async (req, res) => {
        try {
          const Connections = await Connect.find().sort({ createdAt: "desc" }).lean();
          const Topics = await Topic.find().sort({ createdAt: "desc" }).lean();
        
          res.render("connect.ejs", { Topic: Topics, Connections: Connections ,user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      getTopic: async (req, res) => {
        try {
          const Topics = await Topic.findById(req.params.id);
          const Connections = await Connect.find({post: req.params.id}).sort({createdAt: 'desc'}).lean();
        
          res.render("topic.ejs", { Topic: Topics, Connections: Connections ,user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
        createTopic: async (req, res) => {
        try {
            const newTopic = await Topic.create({
                title: req.body.topicTitle,
            });
    
            console.log('New topic created!');
            res.redirect('/connect');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
      createConnection: async (req, res) => {
        try {
    
          const newConnection = await Connect.create({
            description: req.body.description,
            platform: req.body.platform,
            gameUsername: req.body.gameUsername,
            compLevel: req.body.compLevel,
            region:req.body.region,
            communication: req.body.communication,
            post: req.params.id,
            createdBy: req.user.userName,
            createdById: req.user.id,
          });
      
          console.log("Connection post has been created!");
        //   res.redirect("/post/" + newConnection._id);
        res.redirect("/connect");
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      

}