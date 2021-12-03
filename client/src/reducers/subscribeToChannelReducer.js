import {
  SUBSCRIBE_TO_CHANNEL,
  UNSUBSCRIBE_TO_CHANNEL,
  LOAD_CHANNEL_MODULE,
  UNLOAD_CHANNEL_MODULE,
  DEMO_CHANNEL_SET,
} from "../actions/types";

const initialState = {
  channelSource: null,
  currentChannelID: null,
  currentModule: null,
  isSubscribed: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        previousChannelID: state.currentChannelID,
        channelSource: payload.channelSource,
        currentChannelID: payload.channelID,
        currentModule: payload.currentModule,
        isSubscribed: true,
      };
    case UNSUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        channelsource: payload.channelSource,
        currentChannelID: payload.currentChannelID,
        isSubscribed: payload.isSubscribed,
      };
    case LOAD_CHANNEL_MODULE:
    case UNLOAD_CHANNEL_MODULE:
      return {
        ...state,
        currentModule: payload.currentModule,
      };
    case DEMO_CHANNEL_SET:
      return {
        ...state,
        currentChannelID: payload.channelID,
      };
    default:
      return state;
  }
}
