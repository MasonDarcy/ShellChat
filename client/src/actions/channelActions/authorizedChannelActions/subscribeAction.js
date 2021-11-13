import store from "../../../store/store";
import { SUBSCRIBE_TO_CHANNEL, NEW_MESSAGE } from "../../types";
import ReconnectingEventSource from "reconnecting-eventsource";
import {
  JOINED_CHANNEL_KEY,
  LEFT_CHANNEL_KEY,
  CHAT_EVENT_KEY,
} from "../../../constants/constants";
import { channelMessageAction } from "../channelMessageAction";
import {
  setSource,
  setSubscriberCallback,
} from "../../subcriberHelpers/setSubscriberListeners";
import { getMessageCallback } from "../../subcriberHelpers/subscribeOnMessageCallback";
import { getEventTupleArray } from "../../subcriberHelpers/getEventTuples";

export const subscribeAction =
  (channelID, channelPassword) => async (dispatch) => {
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
        { channelMessageAction: channelMessageAction },
        { JOINED_CHANNEL_KEY, LEFT_CHANNEL_KEY }
      )
    );
    dispatch({
      type: SUBSCRIBE_TO_CHANNEL,
      payload: { channelSource, channelID, channelPassword },
    });
  };
