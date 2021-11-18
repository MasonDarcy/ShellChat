import { LOAD_CHANNEL_MODULE, NEW_ERROR_MESSAGE } from "../../types";
import loadModuleRequest from "../../requestHelpers/loadModuleRequest";
export const loadChannelModuleAction =
  (moduleType, targetChannelID, sourceAgentID) => async (dispatch) => {
    console.log(`loadChannelModuleAction: targetChannelID: ${targetChannelID}`);
    let res = await loadModuleRequest(
      moduleType,
      targetChannelID,
      sourceAgentID
    );

    switch (res.status) {
      case 201:
        dispatch({
          type: LOAD_CHANNEL_MODULE,
          payload: {
            currentModule: moduleType,
          },
        });
        break;
      case 401:
        dispatch({
          type: NEW_ERROR_MESSAGE,
          payload: {
            message: "Unauthorized action. Please login.",
            eventName: "ERROR_EVENT",
          },
        });
        break;
      default:
        console.log(`Res status: ${res.status}`);
    }
  };
