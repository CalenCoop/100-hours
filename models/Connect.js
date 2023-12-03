const mongoose = require("mongoose");

const ConnectSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
      },
      platform: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Customize this validation based on your requirements
                const allowedPlatforms = ['PC', 'Xbox', 'PlayStation'];
                return allowedPlatforms.includes(value);
            },
            message: 'Invalid platform. Allowed values are PC, Xbox, PlayStation.',
        },
    },
      gameUsername: {
        type: String,
        required: true,
      },
      compLevel: {
        type: String,
      },
      region: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Customize this validation based on your requirements
                const allowedRegions = ['NA', 'EU', 'AS', 'SA', 'AF'];
                return allowedRegions.includes(value);
            },
            message: 'Invalid region. Allowed values are NA, EU, AS, SA, AF.',
        },
    },
      communication: {
        type: String,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
})


module.exports = mongoose.model("Connect", ConnectSchema);