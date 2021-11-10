const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors");
const EventEmitter = require("events");
const auth = require("./helpers/auth");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
} = require("./helpers/sse/friendSubscriptionData");
const { getSetupSSE } = require("./helpers/getSetupSSE");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");
const Agent = require("../models/Agent");
const { getVerifyAgentExists } = require("./helpers/getVerifyAgentExist");
const verifyAgentExists = getVerifyAgentExists(Agent);

class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();
const setupSSE = getSetupSSE(
  chat,
  listenerTuples,
  onConnectTuples,
  onCloseTuples
);

// @route   post api/friends/:agent_id
// @desc    subscribes to friend requests, or more generally direct messages
// @access  private (TODO)
router.get("/:agent_id", auth, setSSEHeaders, setupSSE);

// @route   post api/friends/request/
// @desc    Trigger a friend request event to be emitted by the server
// @access  private
router.post("/request/", auth, verifyAgentExists, (req, res) => {
  try {
    const { sourceAgentID, targetAgentID } = req.body;
    //Each agent subscribes to incoming requests, named after them
    chat.emit(`requestEvent-${targetAgentID}`, [sourceAgentID]);
    return res.status(201).json({ msg: "Successfully emitted." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
