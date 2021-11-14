const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors/errors");
const EventEmitter = require("events");
const auth = require("./helpers/middleware/auth");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
} = require("./helpers/sse/friendSubscriptionData");
const { getSetupSSE } = require("./helpers/sse/getSetupSSE");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");

/*Warning, the name of Agent is coupled with friendSubscription data.*/
const Agent = require("../models/Agent");
const {
  getVerifyAgentExists,
} = require("./helpers/middleware/getVerifyAgentExist");
const { getIsFriend } = require("./helpers/middleware/getIsFriend");
const { getIsOnline } = require("./helpers/middleware/getIsOnline");

const verifyAgentExists = getVerifyAgentExists(Agent);
const isFriend = getIsFriend(Agent);
const isOnline = getIsOnline(Agent);
class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();
const setupSSE = getSetupSSE(
  chat,
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
  Agent
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

// @route   post api/friends/accept/:agent_id
// @desc    Accept a friend request
// @access  private, subscribed on logon
router.post("/accept/", auth, async (req, res) => {
  const { accepteeAgent } = req.body;
  try {
    let target = await Agent.findOne({ agentName: accepteeAgent }).select(
      "-password"
    );
    let source = await Agent.findById(req.session.userID).select("-password");

    target.friends.unshift(req.session.userID);
    source.friends.unshift(target.id);
    let stringID = target.id.toString();

    source.requests = source.requests.filter((request) => {
      console.log(
        `request.toString(): ${request.toString()} -- stringID: ${stringID}`
      );
      return request.toString() !== stringID;
    });

    target.save();
    source.save();

    console.log(`friendAcceptedEvent-${target.agentName}`);
    //Emit event
    chat.emit(`friendAcceptedEvent-${target.agentName}`, [source.agentName]);

    res.status(201).json({ msg: "success" });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

// @route   post api/friends/message
// @desc    Send a private message to a friend.
// @access  private
router.post(
  "/message/",
  auth,
  verifyAgentExists,
  isFriend,
  isOnline,
  async (req, res) => {
    const { targetAgentID, sourceAgentID, message } = req.body;
    try {
      //Emit event

      chat.emit(`friendMessageEvent-${targetAgentID}`, [
        sourceAgentID,
        message,
      ]);

      res.status(201).json({ msg: "success" });
    } catch (err) {
      errorTool.error400(err, res);
    }
  }
);

// @route   get api/friends/status
// @desc    Check if a friend is online
// @access  private, subscribed on logon
router.get("/status/isOnline", auth, verifyAgentExists, async (req, res) => {
  const { targetAgentID } = res.locals;
  try {
    res.status(200).json({ isOnline: targetAgentID.isOnline });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
