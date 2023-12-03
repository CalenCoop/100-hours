const Topic = require('../models/Topic')
const Connect= require("../models/Connect");


module.exports = {
    getConnect: async (req, res) => {
        try {
          const Connections = await Connect.find().sort({ createdAt: "desc" }).lean();
        
          res.render("connect.ejs", { Connections: Connections ,user: req.user });
        } catch (err) {
          console.log(err);
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
            user: req.user.id, 
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