export const getFriendEventTupleArray = (store, actions, keys) => {
  const friendRequest = {
    eventName: "friendRequestEvent",
    callback: (e) => {
      const { dispatch } = store;

      console.log(`getFriendEventTuples/friendRequestEvent: Fired`);
      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName of the sender
      //parsedData[1] = event type ?? do i need to send this, I don't think so
      dispatch(actions.friendRequestReceivedAction(parsedData[0]));
    },
  };

  const friendAcceptedEvent = {
    eventName: "friendAcceptedEvent",
    callback: (e) => {
      const { dispatch } = store;
      let parsedData = JSON.parse(e.data);

      dispatch(
        actions.specialServerMessageAction(
          `has accepted your friend request.`,
          parsedData[0],
          keys.FRIEND_HAS_ACCEPTED_KEY
        )
      );
      // dispatch(
      //   actions.serverMessageAction(
      //     `${parsedData[0]} has accepted your friend request.`,
      //     keys.COMMAND_SUCCESS_EVENT_KEY
      //   )
      // );

      // dispatch({
      //   type: "NEW_FRIEND_MESSAGE",
      //   payload: {
      //     message: `has accepted your friend request.`,
      //     agent: parsedData[0],
      //     eventName: keys.FRIEND_HAS_ACCEPTED_KEY,
      //   },
      // });
    },
  };

  const friendMessageEvent = {
    eventName: "friendMessageEvent",
    callback: (e) => {
      const { dispatch } = store;
      let parsedData = JSON.parse(e.data);

      dispatch({
        type: "NEW_FRIEND_MESSAGE",
        payload: {
          message: parsedData[1],
          agent: parsedData[0],
          eventName: keys.NEW_FRIEND_MESSAGE_EVENT_KEY,
        },
      });
    },
  };

  //agentID, event
  const friendStatusEvent = {
    eventName: "friendStatusEvent",
    callback: (e) => {
      const { dispatch } = store;
      let parsedData = JSON.parse(e.data);

      console.log(
        `friendStatusEvent: arg1: ${parsedData[0]}, arg2: ${parsedData[1]}`
      );

      if (parsedData[1] == keys.FRIEND_HAS_LOGGED_OFF_EVENT_KEY) {
        dispatch(
          actions.specialServerMessageAction(
            ` has logged off.`,
            parsedData[0],
            keys.NEW_FRIEND_MESSAGE_EVENT_KEY
          )
        );
      }

      if (parsedData[1] == keys.FRIEND_HAS_LOGGED_ON_EVENT_KEY) {
        dispatch(
          actions.specialServerMessageAction(
            ` has logged on.`,
            parsedData[0],
            keys.NEW_FRIEND_MESSAGE_EVENT_KEY
          )
        );
      }
    },
  };

  const duplicateLogonEvent = {
    eventName: "duplicateLogonEvent",
    callback: (e) => {
      const { dispatch } = store;

      setTimeout(function () {
        dispatch(actions.logoutAction());
      }, 10000);
    },
  };

  return [
    friendRequest,
    friendAcceptedEvent,
    friendMessageEvent,
    friendStatusEvent,
    duplicateLogonEvent,
  ];
};
