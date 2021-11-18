const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
  currentChannelListeners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },
  ],
  currentModule: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("channel", ChannelSchema);
