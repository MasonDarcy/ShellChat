export const getEventTupleArray = (store, actions, keys, types) => {
  const channelEntrancesAndExits = {
    eventName: "channelEvent",
    callback: (e) => {
      const { dispatch, getState } = store;
      const { channelMessageAction } = actions;

      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName
      //parsedData[1] = event type

      if (parsedData[0] !== getState().agentReducer.agentName) {
        switch (parsedData[1]) {
          case keys.LEFT_CHANNEL_KEY:
            dispatch(channelMessageAction(parsedData[0], parsedData[1]));
            break;
          case keys.JOINED_CHANNEL_KEY:
            dispatch(channelMessageAction(parsedData[0], parsedData[1]));
            break;
          default:
            console.log("Error");
        }
      }
    },
  };

  const moduleEvent = {
    eventName: "moduleEvent",
    callback: (e) => {
      const { dispatch, getState } = store;

      let parsedData = JSON.parse(e.data);
      console.log(`EventTuples/ModuleEvent/agentName:${parsedData[1]}`);
      console.log(`EventTuples/ModuleEvent/moduleName:${parsedData[0]}`);
      console.log(
        `EventTuples/ModuleEvent/code_module_key:${keys.CODE_MODULE_KEY}`
      );

      if (parsedData[1] !== getState().agentReducer.agentName) {
        switch (parsedData[0]) {
          case keys.CODE_MODULE_KEY:
            dispatch(actions.basicLoadAction(parsedData[0]));
            break;
          case null:
            dispatch(actions.basicLoadAction(null));
            break;
          default:
            console.log(`EventTuples/ModuleEvent/Error!`);
        }
      }
    },
  };

  return [channelEntrancesAndExits, moduleEvent];
};
