const express = require("express");
const router = express.Router();
const errorTool = require("./helpers/errors/errors");
const auth = require("./helpers/middleware/auth");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
} = require("./helpers/sse/friendSubscriptionData");
const { getSetupSSE } = require("./helpers/sse/getSetupSSE");
const { setSSEHeaders, setSSEHeaders2 } = require("./helpers/sse/sse-utility");

/*Warning, the name of Agent is coupled with friendSubscription data.*/
const Agent = require("../models/Agent");
const {
  getVerifyAgentExists,
} = require("./helpers/middleware/getVerifyAgentExist");
const { getIsFriend } = require("./helpers/middleware/getIsFriend");
const { getIsFriendBad } = require("./helpers/middleware/getIsFriendBad");

const { getIsNotFriend } = require("./helpers/middleware/getIsNotFriend");

const { getIsOnline } = require("./helpers/middleware/getIsOnline");
const {
  getExistsInRequests,
} = require("./helpers/middleware/getExistsInRequests");

const { chat } = require("./helpers/sse/getEventEmitter");
const verifyAgentExists = getVerifyAgentExists(Agent);
const isFriend = getIsFriend(Agent);
const isFriendBad = getIsFriendBad(Agent);

const isNotFriend = getIsNotFriend(Agent);

const isOnline = getIsOnline(Agent);
const existsInRequest = getExistsInRequests(Agent);

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
router.get("/:agent_id", auth, setSSEHeaders2, setupSSE);

// @route   post api/friends/request/
// @desc    Trigger a friend request event to be emitted by the server
// @access  private
router.post(
  "/request/",
  auth,
  verifyAgentExists,
  isNotFriend,
  async (req, res) => {
    try {
      const { targetAgentID } = req.body;
      //Each agent subscribes to incoming requests, named after them

      //1. Check to see that the targetAgentID exists
      let target = await Agent.findOne({ agentName: targetAgentID }).select(
        "-password"
      );

      let source = await Agent.findById(req.session.userID).select("-password");

      if (target.requests.includes(req.session.userID)) {
        return res.status(400).json({ msg: "Request already sent." });
      } else {
        target.requests.unshift(req.session.userID);
        target.save();
      }

      chat.emit(`friendRequestEvent-${targetAgentID}`, [source.agentName]);

      return res.status(201).json({ msg: "Success." });
    } catch (err) {
      errorTool.error400(err, res);
    }
  }
);

// @route   post api/friends/accept/:agent_id
// @desc    Accept a friend request
// @access  private, subscribed on logon
router.post(
  "/accept/",
  auth,
  verifyAgentExists,
  existsInRequest,
  async (req, res) => {
    const { targetAgentID } = req.body;
    try {
      let target = await Agent.findOne({ agentName: targetAgentID }).select(
        "-password"
      );
      let source = await Agent.findById(req.session.userID).select("-password");

      target.friends.unshift(req.session.userID);
      source.friends.unshift(target.id);
      let stringID = target.id.toString();

      source.requests = source.requests.filter((request) => {
        return request.toString() !== stringID;
      });

      target.save();
      source.save();

      //Emit event
      chat.emit(`friendAcceptedEvent-${target.agentName}`, [source.agentName]);

      res.status(201).json({ msg: "success" });
    } catch (err) {
      errorTool.error400(err, res);
    }
  }
);

// @route   post api/friends/reject/:agent_id
// @desc    Reject a friend request
// @access  private, subscribed on logon
router.post(
  "/reject/",
  auth,
  verifyAgentExists,
  isFriendBad,
  existsInRequest,
  async (req, res) => {
    const { targetAgentID } = req.body;
    try {
      let target = await Agent.findOne({ agentName: targetAgentID }).select(
        "-password"
      );
      let source = await Agent.findById(req.session.userID).select("-password");

      let stringID = target.id.toString();

      //remove the request
      source.requests = source.requests.filter((request) => {
        return request.toString() !== stringID;
      });

      source.save();

      res.status(201).json({ msg: "success" });
    } catch (err) {
      errorTool.error400(err, res);
    }
  }
);

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
    const { targetAgentID, message } = req.body;
    try {
      //Emit event

      let sourceAgent = await Agent.findById(req.session.userID).select(
        "-password"
      );

      chat.emit(`friendMessageEvent-${targetAgentID}`, [
        sourceAgent.agentName,
        message,
      ]);

      res.status(201).json({ msg: "success" });
    } catch (err) {
      errorTool.error400(err, res);
    }
  }
);

// @route   get api/friends/list
// @desc    Retrieve list of friends and their status
// @access  private, subscribed on logon
router.get("/info/list", auth, async (req, res) => {
  try {
    let currentAgent = await Agent.findById(req.session.userID).select(
      "-password"
    );

    let friends = currentAgent.friends;

    console.log(`Friends: ${friends}`);
    console.log(`currentAgent: ${currentAgent}`);

    const friendData = await Promise.all(
      friends.map(async (friend) => {
        let currentFriend = await Agent.findById(friend);
        let agentName = currentFriend.agentName;
        let isOnline = currentFriend.authConnections > 0;
        return {
          agentName: agentName,
          agentStatus: isOnline,
        };
      })
    );

    if (friends.length > 0) {
      return res.status(200).json(friendData);
    } else {
      return res.status(404).json({ msg: "No friends" });
    }
  } catch (err) {
    errorTool.error400(err, res);
  }
});

// @route   get api/friends/info/requests
// @desc    Retrieve list of all pending friend requests
// @access  private, subscribed on logon
router.get("/info/requests", auth, async (req, res) => {
  try {
    let currentAgent = await Agent.findById(req.session.userID).select(
      "-password"
    );

    let requests = currentAgent.requests;

    const requestData = await Promise.all(
      requests.map(async (request) => {
        let currentRequest = await Agent.findById(request);
        let agentName = currentRequest.agentName;
        return {
          agentName: agentName,
        };
      })
    );

    if (requests.length > 0) {
      return res.status(200).json(requestData);
    } else {
      return res.status(404).json({ msg: "No requests." });
    }
  } catch (err) {
    errorTool.error400(err, res);
  }
});

module.exports = router;
