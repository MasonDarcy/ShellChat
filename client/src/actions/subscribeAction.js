import store from "../store/store";
import { SUBSCRIBE_TO_CHANNEL, NEW_MESSAGE } from "./types";
import ReconnectingEventSource from "reconnecting-eventsource";
import {
  JOINED_CHANNEL_KEY,
  LEFT_CHANNEL_KEY,
  CHAT_EVENT_KEY,
} from "../constants/constants";
import { channelMessageAction } from "./channelMessageAction";
import {
  setSource,
  setSubscriberCallback,
} from "./subcriberHelpers/setSubscriberListeners";
import { getMessageCallback } from "./subcriberHelpers/subscribeOnMessageCallback";
import { getEventTupleArray } from "./subcriberHelpers/getEventTuples";

//Need to unpack all keys automatically into getEventTuplearray so I dont have ot update them here
export const subscribeAction = (channelID, channelPassword) => (dispatch) => {
  let source = setSource(channelID, store, ReconnectingEventSource);

  setSubscriberCallback(
    source,
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
    payload: { source, channelID, channelPassword },
  });
};
