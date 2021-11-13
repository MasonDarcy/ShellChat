const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },
  ],
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },
  ],
});

module.exports = mongoose.model("agent", AgentSchema);
