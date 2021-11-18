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
  {
    prefix: "moduleEvent",
    paramKey: "channel_id",
    callback: (res) => (data) => {
      const sseFormattedResponse = `event: moduleEvent\ndata: ${JSON.stringify(
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

/*Function that fires when the connection to the client is severed.*/
const onCloseFire = [
  {
    args: ["req", "res", "Channel"],
    callback: (req, res, Channel) => async () => {
      //   console.log(`friendsSubscriptionDataonCloseFire: fired`);
      /*
       Basically we want to remove one instance of the agent from the 
      channel listener list
      */
      try {
        const targetChannel = await Channel.findOne({
          channelName: req.params.channel_id,
        });
        let index = targetChannel.currentChannelListeners.indexOf(
          req.session.userID
        );
        targetChannel.currentChannelListeners.splice(index, 1);
        targetChannel.save();
      } catch (err) {
        console.log(err);
      }
    },
  },
];

module.exports = {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onCloseFire,
};
