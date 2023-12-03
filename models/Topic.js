const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Topic", TopicSchema);