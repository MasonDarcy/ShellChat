export const getEventTupleArray = (store, actions, keys) => {
  const channelEntrancesAndExits = {
    eventName: "channelEvent",
    callback: (e) => {
      const { dispatch, getState } = store;
      const { messageAction } = actions;

      let parsedData = JSON.parse(e.data);

      if (parsedData[0] !== getState().agentReducer.agentName) {
        switch (parsedData[1]) {
          case keys.LEFT_CHANNEL_KEY:
            dispatch(
              messageAction(`[server]: ${parsedData[0]} has left the channel.`)
            );
          case keys.JOINED_CHANNEL_KEY:
            dispatch(
              messageAction(
                `[server]: ${parsedData[0]} has joined the channel.`
              )
            );
          default:
        }
      }
    },
  };

  return [channelEntrancesAndExits];
};
