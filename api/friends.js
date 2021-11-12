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
// @desc    subscribes to friend events, like friends
//          logging on, direct messages, friend requests, etc
// @access  private, subscribed on logon
router.get("/:agent_id", auth, setSSEHeaders, setupSSE);

// @route   post api/friends/request/
// @desc    Trigger a friend request event to be emitted by the server
// @access  private
router.post("/request/", auth, verifyAgentExists, async (req, res) => {
  try {
    const { sourceAgentID, targetAgentID } = req.body;
    console.log(`Got a request: ${sourceAgentID}, ${targetAgentID}`);
    //Each agent subscribes to incoming requests, named after them

    //1. Check to see that the targetAgentID exists
    let target = await Agent.findOne({ agentName: targetAgentID }).select(
      "-password"
    );

    if (target) {
      if (target.requests.includes(req.session.userID)) {
        return res.status(400).json({ msg: "Request already sent." });
      } else {
        target.requests.unshift(req.session.userID);
        target.save();
        console.log("added request");
      }
    } else {
      return res.status(404).json({ error: "Agent doesn't exist." });
    }

    chat.emit(`friendRequestEvent-${targetAgentID}`, [sourceAgentID]);

    return res.status(201).json({ msg: "Success." });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
