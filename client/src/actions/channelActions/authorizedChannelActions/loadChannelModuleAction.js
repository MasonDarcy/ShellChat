import { types } from "../../types";
import loadModuleRequest from "../../requestHelpers/loadModuleRequest";
import keys from "../../../constants/constants";
export const loadChannelModuleAction =
  (moduleType, targetChannelID, sourceAgentID, isSubscribed) =>
  async (dispatch) => {
    console.log(`loadChannelModuleAction: targetChannelID: ${targetChannelID}`);

    if (isSubscribed) {
      let res = await loadModuleRequest(
        moduleType,
        targetChannelID,
        sourceAgentID
      );
      console.log(`res.status: ${res.status}`);
      switch (res.status) {
        case 201:
          dispatch({
            type: types.LOAD_CHANNEL_MODULE,
            payload: {
              currentModule: moduleType,
            },
          });

          dispatch({
            type: types.AGENT_ACTION_MESSAGE,
            payload: {
              message: moduleType
                ? ` is loading ${moduleType}.`
                : ` has closed the module.`,
              eventName: keys.AGENT_ACTION_KEY,
              agent: sourceAgentID,
            },
          });
          break;
        case 401:
          dispatch({
            type: types.NEW_ERROR_MESSAGE,
            payload: {
              message: "Unauthorized action. Please login.",
              eventName: keys.ERROR_EVENT_KEY,
            },
          });
          break;
        default:
          console.log(`Res status: ${res.status}`);
      }
    } else {
      dispatch({
        type: types.NEW_ERROR_MESSAGE,
        payload: {
          message: "error: cannot load unless in a channel.",
          eventName: keys.ERROR_EVENT_KEY,
        },
      });
    }
  };
