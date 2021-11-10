const { JOINED_CHANNEL_KEY, LEFT_CHANNEL_KEY } = require("../../../constants");
//TODO: import constants for paramkeys, prefixes, etc
/*
listenerTuples
prefix, paramKey, and callback
*/
const listenerTuples = [
  {
    prefix: "chatEvent",
    paramKey: "channel_id",
    callback: (res) => (data) => {
      const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
  {
    prefix: "channelEvent",
    paramKey: "channel_id",
    callback: (res) => (data) => {
      const sseFormattedResponse = `event: channelEvent\ndata: ${JSON.stringify(
        data
      )}\n\n`;
      res.write(sseFormattedResponse);
    },
  },
];

/*
onConnectTuples
prefix, paramKey, and payload
*/
const onConnectTuples = [
  {
    prefix: "channelEvent",
    paramKey: "channel_id",
    payload: {
      paramKeys: ["agent_id"],
      key: JOINED_CHANNEL_KEY,
    },
  },
];

/*
onCloseTuples
prefix, paramKey, and payload
*/
const onCloseTuples = [
  {
    prefix: "channelEvent",
    paramKey: "channel_id",
    payload: {
      paramKeys: ["agent_id"],
      key: LEFT_CHANNEL_KEY,
    },
  },
];

module.exports = { listenerTuples, onConnectTuples, onCloseTuples };
