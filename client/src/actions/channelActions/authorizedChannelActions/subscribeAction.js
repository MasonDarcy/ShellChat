import store from "../../../store/store";
import {
  SUBSCRIBE_TO_CHANNEL,
  NEW_MESSAGE,
  LOAD_CHANNEL_MODULE,
} from "../../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import {
  JOINED_CHANNEL_KEY,
  LEFT_CHANNEL_KEY,
  CHAT_EVENT_KEY,
  CODE_MODULE_KEY,
  LOAD_MODULE_KEY,
} from "../../../constants/constants";
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
    console.log(`subscribeAction//channelIDarg: ${channelID}`);

    let channelSource = setSource(
      "http://localhost:5000/api/chat/",
      [channelID, store.getState().agentReducer.agentName],
      ReconnectingEventSource
    );
    setSubscriberCallback(
      channelSource,
      getMessageCallback(store, {
        newMessage: NEW_MESSAGE,
        CHAT_EVENT_KEY,
      }),

      getEventTupleArray(
        store,
        { channelMessageAction: channelMessageAction, basicLoadAction },
        {
          JOINED_CHANNEL_KEY,
          LEFT_CHANNEL_KEY,
          LOAD_MODULE_KEY,
          CODE_MODULE_KEY,
        }
      )
    );

    let currentModule = await getChannelModuleRequest(channelID);

    dispatch({
      type: SUBSCRIBE_TO_CHANNEL,
      payload: { channelSource, channelID, channelPassword, currentModule },
    });
  };
