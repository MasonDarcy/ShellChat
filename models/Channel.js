const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("channel", ChannelSchema);
