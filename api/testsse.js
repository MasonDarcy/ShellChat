const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");
class MyEmitter extends EventEmitter {}
const chat = new MyEmitter();

const bindChatChannel = (req, res) => {
  const listeners = chat.listeners(
    `chatEvent-${req.params.channel_id}-${req.params.agentID}`
  );
  if (listeners.length > 0) {
    chat.removeListener(
      `chatEvent-${req.params.channel_id}-${req.params.agentID}`,
      listeners[0]
    );
  }
  chat.on(
    `chatEvent-${req.params.channel_id}-${req.params.agentID}`,
    (data) => {
      const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
      res.write(sseFormattedResponse);
    }
  );
};

// @route   post api/chat/:channel_id/:agent_id
// @desc    chat subscription
// @access  public
router.get("/chat/:channel_id/:agent_id", setSSEHeaders, bindChatChannel);

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  public
router.post("/sendMessage/:channel_id/:agent_id", (req, res) => {
  try {
    let message = req.body.message;

    chat.emit(
      `chatEvent-${req.params.channel_id}-${req.params.agentID}`,
      message
    );

    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
