const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors/errors");
const EventEmitter = require("events");
const Channel = require("../models/Channel");
const { getJoinChannel } = require("./helpers/middleware/getJoinChannel");
const auth = require("./helpers/middleware/auth");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");
const { getSetupSSE } = require("./helpers/sse/getSetupSSE");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onCloseFire,
} = require("./helpers/sse/chatSubscriptionData");
const joinChannel = getJoinChannel(Channel);
class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();
const setupSSE = getSetupSSE(
  chat,
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  null,
  onCloseFire,
  null,
  Channel
);

// @route   post api/chat/:channel_id/:agent_id
// @desc    chat subscription
// @access  private
router.get(
  "/:channel_id/:agent_id",
  auth,
  joinChannel,
  setSSEHeaders,
  setupSSE
);

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

// @route   put api/modules/open
// @desc    mutate the current channel module
// @access  private
router.post("/modules/open/", auth, async (req, res) => {
  try {
    const { moduleName, targetChannelID, sourceAgentID } = req.body;
    console.log(`chat/modules/open route: moduleName: ${moduleName}`);
    console.log(`chat/modules/open route: targetChannelID: ${targetChannelID}`);
    console.log(`chat/modules/open route: sourceAgentID: ${sourceAgentID}`);

    //Mutate the module in the database, implicitely it should exist
    const channel = await Channel.findOne({ channelName: targetChannelID });

    channel.currentModule = moduleName;
    await channel.save();

    //emit an event to notify all lads in the channel that we're opening a module
    chat.emit(`moduleEvent-${targetChannelID}`, [moduleName, sourceAgentID]);

    res.status(201).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

// @route   get api/modules/
// @desc    mutate the current channel module
// @access  private
router.get("/modules/channel/:channel_id", auth, async (req, res) => {
  try {
    const targetChannelID = req.params.channel_id;

    //Mutate the module in the database, implicitely it should exist
    const channel = await Channel.findOne({ channelName: targetChannelID });
    if (channel) {
      return res.status(200).json(channel.currentModule);
    } else {
      return res.status(200).json(null);
    }
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
