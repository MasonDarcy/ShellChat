const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");

//Leaving this out for now
//const auth = require("./helpers/auth");

//What happens if I refactor this into the piece of middleware itself?
//It would be provisioned and destroyed with the middleware lexical environment
//Instead of one eventemitter, I would have an eventemitter for every connection
class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();

// Unfortunately, we must send the channelID in the query string
// This makes this route vulnerable to an XSS attack so I might want to add some regex scrubbers here
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

// @route   post api/chat/:channel_id
// @desc    chat subscription
// @access  private (TODO) (leaving auth out for now)
router.get("/:channel_id/", setSSEHeaders, bindChatChannel);

// @route   post api/sendMessage/:channel_id/:agent_id
// @desc    Post a chat message to a channel
// @access  private (TODO) (leaving auth out for now)
router.post("/sendMessage/", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers: Content-Type, Authorization");

  try {
    const { message, channelID, agentID } = req.body;

    chat.emit(`chatEvent-${channelID}`, message, agentID);

    res.status(200).json({ msg: "Response fired." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
