const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");

class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();

const bindChatChannel = (req, res) => {
  console.log(chat.listenerCount());

  const activeListener = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    res.write(sseFormattedResponse);
  };

  chat.on(`chatEvent-${req.params.channel_id}`, activeListener);

  res.on("close", () => {
    console.log("Close event fired");
    chat.removeListener(`chatEvent-${req.params.channel_id}`, activeListener);
  });
};

// @route   post api/chat/:channel_id/:agent_id
// @desc    chat subscription
// @access  public
router.get("/chat/:channel_id/", setSSEHeaders, bindChatChannel);

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  public
router.post("/sendMessage/:channel_id", (req, res) => {
  try {
    let message = req.body.message;

    chat.emit(`chatEvent-${req.params.channel_id}`, message);

    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
