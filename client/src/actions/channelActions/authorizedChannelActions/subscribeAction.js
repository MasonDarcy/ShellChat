import store from "../../../store/store";
import ReconnectingEventSource from "reconnecting-eventsource";
import { types } from "../../types";
import keys from "../../../constants/constants";
import { channelMessageAction } from "../channelMessageAction";
import { basicLoadAction } from "../basicLoadAction";
import getChannelModuleRequest from "../../requestHelpers/getChannelModuleRequest";
import {
  setSource,
  setSubscriberCallback,
} from "../../subcriberHelpers/setSubscriberListeners";
import { getMessageCallback } from "../../subcriberHelpers/subscribeOnMessageCallback";
import { getEventTupleArray } from "../../subcriberHelpers/getEventTuples";

export const subscribeAction =
  (channelID, channelPassword) => async (dispatch) => {
    let channelSource = setSource(
      `/api/chat`,
      [channelID, store.getState().agentReducer.agentName],
      ReconnectingEventSource
    );
    setSubscriberCallback(
      channelSource,
      getMessageCallback(store, {
        newMessage: types.NEW_MESSAGE,
        ...keys,
      }),

      getEventTupleArray(
        store,
        { channelMessageAction: channelMessageAction, basicLoadAction },
        { ...keys },
        { ...types }
      )
    );

    let currentModule = await getChannelModuleRequest(channelID);
    dispatch({
      type: types.NEW_SERVER_MESSAGE,
      payload: {
        message: `Joined channel:`,
        embedded: channelID,
        eventName: keys.EMBEDDED_COMMAND_SUCCESS_EVENT_KEY,
      },
    });
    dispatch({
      type: types.SUBSCRIBE_TO_CHANNEL,
      payload: { channelSource, channelID, channelPassword, currentModule },
    });
  };
