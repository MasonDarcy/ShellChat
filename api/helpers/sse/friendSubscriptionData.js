const {
  JOINED_CHANNEL_KEY,
  LEFT_CHANNEL_KEY,
  FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
  FRIEND_HAS_LOGGED_ON_EVENT_KEY,
} = require("../../../constants");
//TODO: import constants for paramkeys, prefixes, etc
/*
listenerTuples
prefix, paramKey, and callback
*/
//Note, the paramKey must correspond to the parameter key set in the route handler
const listenerTuples = [
  {
    prefix: "friendRequestEvent",
    paramKey: "agent_id",
    callback: (res) => (data) => {
      //      console.log("friendSubscriptioNData/friendRequestEvent: fired");

      const sseFormattedResponse = `event: friendRequestEvent\ndata: ${JSON.stringify(
        data
      )}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
  {
    prefix: "friendAcceptedEvent",
    paramKey: "agent_id",
    callback: (res) => (data) => {
      const sseFormattedResponse = `event: friendAcceptedEvent\ndata: ${JSON.stringify(
        data
      )}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
  {
    prefix: "friendMessageEvent",
    paramKey: "agent_id",
    callback: (res) => (data) => {
      console.log("friendSubscriptionData/friendMessageEvent: fired");
      console.log(`friendSubscriptioNData/friendMessageEvent: ${data}`);
      const sseFormattedResponse = `event: friendMessageEvent\ndata: ${JSON.stringify(
        data
      )}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
  // {
  //   prefix: "friendLoggedOnEvent",
  //   paramKey: "agent_id",
  //   callback: (res) => (data) => {
  //     console.log("friendSubscriptionData/friendLoggedOnEvent: fired");
  //     console.log(`friendSubscriptioNData/friendLoggedOnEvent: ${data}`);
  //     const sseFormattedResponse = `event: friendLoggedOnEvent\ndata: ${JSON.stringify(
  //       data
  //     )}\n\n`;
  //     res.write(sseFormattedResponse);
  //   },
  // },
];

/*
onConnectTuples
prefix, paramKey, and payload
//These emit the data which is received by listener tuples, who relay it to the front-end
*/
const onConnectTuples = [
  // {
  //   prefix: "friendStatusEvent",
  //   paramKey: "agent_id",
  //   payload: {
  //     paramKeys: ["agent_id"],
  //     key: FRIEND_HAS_LOGGED_ON_EVENT_KEY,
  //   },
  // },
];

/*
onCloseTuples
prefix, paramKey, and payload
*/
const onCloseTuples = [
  //   {
  //     prefix: "friendStatusEvent",
  //     paramKey: "agent_id",
  //     payload: {
  //       paramKeys: ["agent_id"],
  //       key: FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
  //     },
  //   },
];

/*Data for functions that fire when the connection opens.*/
const onOpenFire = [
  //Sets the agent to be online
  {
    callback: (Agent, req) => async () => {
      console.log(`friendsSubscriptionDataonOpenFire: fired`);
      let targetAgent = await Agent.findById(req.session.userID);
      targetAgent.isOnline = true;
      targetAgent.save();
    },
    args: ["Agent", "req"],
  },
];

/*Data for functions that fire when the connection closes.*/
const onCloseFire = [
  //Sets the agent to be offline
  {
    args: ["Agent", "req"],
    callback: (Agent, req) => async () => {
      console.log(`friendsSubscriptionDataonOpenFire: fired`);
      let targetAgent = await Agent.findById(req.session.userID);
      targetAgent.isOnline = false;
      targetAgent.save();
    },
  },
];

module.exports = {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
};
