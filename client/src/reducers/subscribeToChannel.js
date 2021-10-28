import {
    SUBSCRIBE_TO_CHANNEL
} from "../actions/types";

const initialState = {
    currentChannelID: null,
    isSubscribed: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        currentChannelID: payload.channelID,
        isSubscribed: true
      };
    default:
      return state;
  }
}

