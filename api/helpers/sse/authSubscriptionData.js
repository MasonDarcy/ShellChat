const {
  FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
  FRIEND_HAS_LOGGED_ON_EVENT_KEY,
} = require("../../../constants");

/*
  listenerTuples
  prefix, paramKey, and callback
  */
//Note, the paramKey must correspond to the parameter key set in the route handler
const listenerTuples = [];

/*
  onConnectTuples
  prefix, paramKey, and payload
  //These emit the data which is received by listener tuples, who relay it to the front-end
  */
const onConnectTuples = [];

/*
  onCloseTuples
  prefix, paramKey, and payload
  */
const onCloseTuples = [];

/*Data for functions that fire when the connection opens.*/
const onOpenFire = [
  //  Increments connection count
  {
    callback: (Agent, req, chat) => async () => {
      console.log("authsubdata/onFired");
      let targetAgent = await Agent.findById(req.session.userID);
      let previousConnections = targetAgent.authConnections;
      targetAgent.authConnections += 1;
      targetAgent.save();
      console.log(`previousConnections: ${previousConnections}`);
      if (previousConnections == 0) {
        let friends = targetAgent.friends;

        const friendData = await Promise.all(
          friends.map(async (friend) => {
            let currentFriend = await Agent.findById(friend);
            let agentName = currentFriend.agentName;
            let agentConnections = currentFriend.authConnections;
            return {
              agentName: agentName,
              agentStatus: agentConnections > 0,
            };
          })
        );

        friendData.forEach((friend) => {
          if (friend.agentStatus) {
            console.log(
              `Emitting event: friendStatusEvent-${friend.agentName} `
            );
            chat.emit(`friendStatusEvent-${friend.agentName}`, [
              targetAgent.agentName,
              FRIEND_HAS_LOGGED_ON_EVENT_KEY,
            ]);
          }
        });
      }
    },
    args: ["Agent", "req", "chat"],
  },
];

/*Data for functions that fire when the connection closes.*/
const onCloseFire = [
  {
    callback: (Agent, req, chat) => async () => {
      let targetAgent = await Agent.findById(req.session.userID);
      let previousConnections = targetAgent.authConnections;
      targetAgent.authConnections -= 1;
      targetAgent.save();
      console.log(`previousConnections: ${previousConnections}`);
      if (previousConnections == 1) {
        let friends = targetAgent.friends;

        const friendData = await Promise.all(
          friends.map(async (friend) => {
            let currentFriend = await Agent.findById(friend);
            let agentName = currentFriend.agentName;
            let agentConnections = currentFriend.authConnections;
            return {
              agentName: agentName,
              agentStatus: agentConnections > 0,
            };
          })
        );

        friendData.forEach((friend) => {
          if (friend.agentStatus) {
            console.log(
              `Emitting event: friendStatusEvent-${friend.agentName} `
            );
            chat.emit(`friendStatusEvent-${friend.agentName}`, [
              targetAgent.agentName,
              FRIEND_HAS_LOGGED_OFF_EVENT_KEY,
            ]);
          }
        });
      }
    },
    args: ["Agent", "req", "chat"],
  },
];

module.exports = {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
};
