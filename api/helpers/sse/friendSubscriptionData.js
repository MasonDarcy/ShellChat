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
      console.log("friendSubscriptioNData/friendRequestEvent: fired");
      const sseFormattedResponse = `event: friendRequestEvent\ndata: ${JSON.stringify(
        data
      )}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
  //   {
  //     prefix: "friendStatusEvent",
  //     paramKey: "agent_id",
  //     callback: (res) => (data) => {
  //       const sseFormattedResponse = `event: friendStatusEvent\ndata: ${JSON.stringify(
  //         data
  //       )}\n\n`;
  //       res.write(sseFormattedResponse);
  //     },
  //   },
];

/*
onConnectTuples
prefix, paramKey, and payload
//These emit the data which is received by listener tuples, who relay it to the front-end
*/
const onConnectTuples = [
  //   {
  //     prefix: "friendStatusEvent",
  //     paramKey: "agent_id",
  //     payload: {
  //       paramKeys: ["agent_id"],
  //       key: FRIEND_HAS_LOGGED_ON_EVENT_KEY,
  //     },
  //   },
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

module.exports = { listenerTuples, onConnectTuples, onCloseTuples };
