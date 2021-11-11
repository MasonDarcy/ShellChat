const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const auth = require("./helpers/auth");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");
const { getSetupSSE } = require("./helpers/getSetupSSE");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
} = require("./helpers/sse/chatSubscriptionData");
class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();
const setupSSE = getSetupSSE(
  chat,
  listenerTuples,
  onConnectTuples,
  onCloseTuples
);

// @route   post api/chat/:channel_id/:agent_id
// @desc    chat subscription
// @access  private
router.get("/:channel_id/:agent_id", auth, setSSEHeaders, setupSSE);

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  private
router.post("/sendMessage/", auth, (req, res) => {
  try {
    const { message, channelID, agentID } = req.body;
    chat.emit(`chatEvent-${channelID}`, [message, agentID]);
    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

//This literally was doing nothing lol
// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Sends a channel event to all subscribed agents (agent has left or joined the channel)
// @access  private (TODO)
// router.post("/sendChannelEvent/", (req, res) => {
//   try {
//     const { message, channelID, agentID } = req.body;
//     chat.emit(`channelEvent-${channelID}`, [message, agentID]);
//   } catch (err) {
//     errorTool.error400(err, res);
//   }
// });

module.exports = router;
