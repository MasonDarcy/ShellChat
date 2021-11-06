import { SUBSCRIBE_TO_CHANNEL, UNSUBSCRIBE_TO_CHANNEL } from "../actions/types";

const initialState = {
  source: null,
  previousChannelID: null,
  currentChannelID: null,
  isSubscribed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        previousChannelID: state.currentChannelID,
        source: payload.source,
        currentChannelID: payload.channelID,
        isSubscribed: true,
      };
    case UNSUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        source: payload.source,
        currentChannelID: payload.currentChannelID,
        isSubscribed: payload.isSubscribed,
      };
    default:
      return state;
  }
}
