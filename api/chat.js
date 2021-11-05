const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const { setSSEHeaders, getSSEListener } = require("./helpers/sse/sse-utility");
const { JOINED_CHANNEL_KEY, LEFT_CHANNEL_KEY } = require("../constants");

class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();

const bindChatChannel = (req, res) => {
  const pump = () => {
    res.write("\n");
  };

  const hbt = setInterval(pump, 30000);

  const activeListener = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    res.write(sseFormattedResponse);
  };

  // const channelListener = (data) => {
  //   const sseFormattedResponse = `event: channelEvent\ndata: ${JSON.stringify(
  //     data
  //   )}\n\n`;
  //   res.write(sseFormattedResponse);
  // };

  const channelListener = getSSEListener("channelEvent", res);

  chat.on(`channelEvent-${req.params.channel_id}`, channelListener);
  chat.on(`chatEvent-${req.params.channel_id}`, activeListener);
  chat.emit(`channelEvent-${req.params.channel_id}`, [
    req.params.agent_id,
    JOINED_CHANNEL_KEY,
  ]);
  res.on("close", () => {
    console.log("Close event fired");

    clearInterval(hbt);
    chat.removeListener(`chatEvent-${req.params.channel_id}`, activeListener);
    chat.removeListener(
      `channelEvent-${req.params.channel_id}`,
      channelListener
    );
    chat.emit(`channelEvent-${req.params.channel_id}`, [
      req.params.agent_id,
      LEFT_CHANNEL_KEY,
    ]);
  });
};

// @route   post api/chat/:channel_id/:agent_id
// @desc    chat subscription
// @access  private (TODO) (leaving auth out for now)
router.get("/:channel_id/:agent_id", setSSEHeaders, bindChatChannel);

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  private (TODO) (leaving auth out for now)
router.post("/sendMessage/", (req, res) => {
  try {
    const { message, channelID, agentID } = req.body;
    // chat.emit(`chatEvent-${channelID}`, [message, agentID]);
    chat.emit(`chatEvent-${channelID}`, message, agentID);
    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  private (TODO) (leaving auth out for now)
router.post("/sendChannelEvent/", (req, res) => {
  try {
    const { message, channelID, agentID } = req.body;
    chat.emit(`channelEvent-${channelID}`, [message, agentID]);
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
