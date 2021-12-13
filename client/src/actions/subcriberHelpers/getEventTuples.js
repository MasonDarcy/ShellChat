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
            console.log(`getEventTuples/parsedData[0]: ${parsedData[0]}`);
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
            dispatch({
              type: types.AGENT_ACTION_MESSAGE,
              payload: {
                message: ` has opened the code module.`,
                agent: parsedData[1],
                eventName: keys.AGENT_ACTION_KEY,
              },
            });
            break;
          case null:
            dispatch(actions.basicLoadAction(null));
            dispatch({
              type: types.AGENT_ACTION_MESSAGE,
              payload: {
                message: ` has closed the module.`,
                agent: parsedData[1],
                eventName: keys.AGENT_ACTION_KEY,
              },
            });
            break;
          default:
            console.log(`EventTuples/ModuleEvent/Error!`);
        }
      }
    },
  };

  const codeCompilationEvent = {
    eventName: "codeEvent",
    callback: (e) => {
      const { dispatch, getState } = store;
      const { channelMessageAction } = actions;

      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName
      //parsedData[1] = script

      if (parsedData[0] !== getState().agentReducer.agentName) {
        dispatch({
          type: types.NEW_CODE_EDITOR_OUTPUT,
          payload: {
            data: parsedData[1],
            time: new Date().toLocaleTimeString(),
          },
        });

        dispatch({
          type: types.AGENT_ACTION_MESSAGE,
          payload: {
            message: ` has sent the code for evaluation.`,
            agent: parsedData[0],
            eventName: keys.AGENT_ACTION_KEY,
          },
        });
      }
    },
  };

  return [channelEntrancesAndExits, moduleEvent, codeCompilationEvent];
};
